import { CompletarPedidoUseCase } from './../pedido/complete-pedido';
import { CreateLoteTostado } from './../lote/lote-tostado/create-lote-tostado';
import { CreateLoteTostadoDto } from './../../dtos/lotes/lote-tostado/create';
import { UpdateLoteDto } from './../../dtos/lotes/lote/update';
import { TuesteRepository } from '../../repository/tueste.repository';
import { PedidoRepository } from '../../repository/pedido.repository';
import { LoteRepository } from '../../repository/lote.repository';
import { CompleteTuesteDto } from '../../dtos/tueste/complete';
import { UpdatePedidoDto } from '../../dtos/pedido/update';
import { TuesteEntity } from '../../entities/tueste.entity';
import { UpdateTuesteDto } from '../../dtos/tueste/update';
import { InventarioLoteRepository } from '../../repository/inventario-lote.repository';
import { InventarioLoteTostadoRepository } from '../../repository/inventario-lote-tostado.repository';

export interface CompleteTuesteUseCase {
    execute(id_tueste: string, completeTuesteDto: CompleteTuesteDto, id_completado_por: string): Promise<TuesteEntity>;
}

export class CompleteTueste implements CompleteTuesteUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository,
        private readonly completarPedidoUseCase: CompletarPedidoUseCase

    ) { }

    async execute(id_tueste: string, completeTuesteDto: CompleteTuesteDto, id_completado_por: string): Promise<TuesteEntity> {
        const tueste = await this.tuesteRepository.getTuesteById(id_tueste);
        if (!tueste) throw new Error("Tueste no encontrado");

        const tuesteCompletado = await this.tuesteRepository.completarTueste(
            tueste.id_tueste,
            completeTuesteDto
        );

        const tuestesDelPedido = await this.tuesteRepository.getTostadosByPedido(tueste.id_pedido);
        const todosCompletados = tuestesDelPedido.every(t => t.estado_tueste === "Completado");

        if (todosCompletados) {
            await this.completarPedidoUseCase.execute(tueste.id_pedido, id_completado_por);
        }

        return TuesteEntity.fromObject(tuesteCompletado);
    }
}
