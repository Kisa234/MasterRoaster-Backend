import  { CreateLoteTostado } from './../lote/lote-tostado/create-lote-tostado';
import { CreateLoteTostadoDto } from './../../dtos/lotes/lote-tostado/create';
import { UpdateLoteDto } from './../../dtos/lotes/lote/update';
import { TuesteRepository } from '../../repository/tueste.repository';
import { PedidoRepository } from '../../repository/pedido.repository';
import { LoteRepository } from '../../repository/lote.repository';
import { CompleteTuesteDto } from '../../dtos/tueste/complete';
import { UpdatePedidoDto } from '../../dtos/pedido/update';
import { TuesteEntity } from '../../entities/tueste.entity';

export interface CompleteTuesteUseCase {
    execute(id_tueste: string, completeTuesteDto:CompleteTuesteDto): Promise<TuesteEntity>;
}

export class CompleteTueste implements CompleteTuesteUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository,
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly createLoteTostado: CreateLoteTostado
    ) {}

    async execute(id_tueste: string,completeTuesteDto:CompleteTuesteDto): Promise<TuesteEntity> {
        //1. verificar si el tueste existe
        const tueste = await this.tuesteRepository.getTuesteById(id_tueste);
        if (!tueste) throw new Error("Tueste no encontrado");

        //2. completar tueste
        const tuesteCompletado = await this.tuesteRepository.completarTueste(tueste.id_tueste,completeTuesteDto);
        const tuestesDelPedido = await this.tuesteRepository.getTostadosByPedido(tueste.id_pedido);

        //3. verificar si todos los tuestes del pedido estan completados
        const todosCompletados = tuestesDelPedido.every(t =>
            t.estado_tueste === "Completado"
        );
        if (!todosCompletados) {
            return TuesteEntity.fromObject(tuesteCompletado);
        }

        // 4. si todos los tuestes estan completados, completar el pedido
        const pedido = await this.pedidoRepository.getPedidoById(tueste.id_pedido);
        if (!pedido) throw new Error("Pedido no encontrado");
        this.pedidoRepository.completarPedido(pedido.id_pedido);
        
        //5. actualizar lote si es Tostado Verde
        let pesoTotalTostado = tuestesDelPedido.reduce((total, t) => total + t.peso_salida!, 0);
        const lote = await this.loteRepository.getLoteById(pedido.id_lote);
        if (!lote) throw new Error("Lote no encontrado");
        if (lote.tipo_lote === "Tostado Verde") {
            // sumar todos los pesos finales de los tuestes
            const pesoFinalTostado = lote.peso_tostado! - pesoTotalTostado;
            const pesoFinalVerde = lote.peso - pedido.cantidad;
            const [,updateLoteDto] = UpdateLoteDto.update({
                peso:pesoFinalVerde,
                peso_tostado: pesoFinalTostado,
            });
            console.log(lote.id_lote,updateLoteDto);
            if (!updateLoteDto) throw new Error("Error generando DTO para lote tostado");
            await this.loteRepository.updateLote(lote.id_lote, updateLoteDto);
            // eliminar lote si ambos pesos son 0 
            if (pesoFinalTostado == 0 && pesoFinalVerde == 0){
                await this.loteRepository.deleteLote(lote.id_lote);
            }
        }

        // 6. crear lote tostado       
        const [,dto] = CreateLoteTostadoDto.create({
            id_lote: lote.id_lote,
            fecha_tostado: new Date(),
            peso: pesoTotalTostado,
            perfil_tostado: pedido.comentario,
        })
        if (!dto) throw new Error("Error generando DTO para lote tostado");
        const loteTostado = await this.createLoteTostado.execute(dto);
        
        //7. actualizar nuevo lote en el pedido
        const [, updatePedido] = UpdatePedidoDto.update({
            id_nuevoLote_tostado: loteTostado.id_lote_tostado,
        });
        if (!updatePedido) throw new Error("Error generando DTO para lote tostado");
        await this.pedidoRepository.updatePedido(pedido.id_pedido, updatePedido);
        return TuesteEntity.fromObject(tuesteCompletado);
    }
}
