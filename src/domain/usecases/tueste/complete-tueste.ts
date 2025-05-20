import { Pedido } from './../../../../node_modules/.prisma/client/index.d';
import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from '../../repository/tueste.repository';
import { LoteTostadoEntity } from "../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../repository/loteTostado.repository";
import { CreateLoteTostadoDto } from "../../dtos/lotes/lote-tostado/create";
import { PedidoRepository } from '../../repository/pedido.repository';
import { LoteRepository } from '../../repository/lote.repository';
import { CompleteTuesteDto } from '../../dtos/tueste/complete';
import { UpdateLoteDto } from '../../dtos/lotes/lote/update';

export interface CompleteTuesteUseCase {
    execute(id_tueste: string, completeTuesteDto:CompleteTuesteDto): Promise<LoteTostadoEntity | null>;
}

export class CompleteTueste implements CompleteTuesteUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository,
        private readonly loteTostadoRepository: LoteTostadoRepository,
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
    ) {}

    async execute(id_tueste: string,completeTuesteDto:CompleteTuesteDto): Promise<LoteTostadoEntity | null> {

        const tueste = await this.tuesteRepository.getTuesteById(id_tueste);
        if (!tueste) throw new Error("Tueste no encontrado");

        await this.tuesteRepository.completarTueste(tueste.id_tueste,completeTuesteDto);
        const tuestesDelPedido = await this.tuesteRepository.getTostadosByPedido(tueste.id_pedido);

        const todosCompletados = tuestesDelPedido.every(t =>
            t.estado_tueste === "Completado"
        );
        
        const pedido = await this.pedidoRepository.getPedidoById(tueste.id_pedido);
        if (!pedido) throw new Error("Pedido no encontrado");
        
        
        if (!todosCompletados) {
            return null; 
        }
        //completar pedido
        await this.pedidoRepository.completarPedido(pedido.id_pedido);
        const pesoTotal = tuestesDelPedido.reduce((total, t) => total + t.peso_salida!, 0);
        
        if (pedido.tipo_pedido === "Verde Tostado") {
            const lote = await this.loteRepository.getLoteById(pedido.id_lote);
            const [e, dto] = UpdateLoteDto.update({
                peso_tostado: lote?.peso_tostado!- pesoTotal,
            });
           this.loteRepository.updateLote(pedido.id_lote ,dto!);
        }

        // Crear lote tostado (puedes ajustar el dto según tu estructura)
        const [,dto]  = CreateLoteTostadoDto.create({
            id_lote_tostado: `${pedido.id_pedido}-T`,
            id_lote: pedido.id_lote,
            fecha_tostado: Date.now(),
            peso: pesoTotal ,
            perfil_tostado: pedido.comentario,
        })
        const nuevoLoteTostado = await this.loteTostadoRepository.createLoteTostado(dto!);

        return nuevoLoteTostado;
    }
}
