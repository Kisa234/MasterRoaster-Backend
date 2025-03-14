import { PedidoEntity } from '../../domain/entities/pedido.entity';
import { PedidoRepository } from '../../domain/repository/pedido.repository';
import { PedidoDataSource } from '../datasources/pedido.datasource.impl';

export class PedidoRepositoryImpl implements PedidoRepository {

    constructor(
        private readonly pedidoDataSource: PedidoDataSource
    ) { }

    createPedido(pedido: PedidoEntity): Promise<PedidoEntity> {
        throw new Error('Method not implemented.');
    }
    getPedidoById(id: string): Promise<PedidoEntity | null> {
        throw new Error('Method not implemented.');
    }
    updatePedido(id: string, data: Partial<PedidoEntity>): Promise<PedidoEntity> {
        throw new Error('Method not implemented.');
    }
    deletePedido(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getPedidosByEstado(estado: string): Promise<PedidoEntity[]> {
        throw new Error('Method not implemented.');
    }
    getPedidosByCliente(cliente_id: string): Promise<PedidoEntity[]> {
        throw new Error('Method not implemented.');
    }
    asignarPedido(id_pedido: string, asignado_a_id: string): Promise<PedidoEntity> {
        throw new Error('Method not implemented.');
    }
    aceptarPedido(id_pedido: string): Promise<PedidoEntity> {
        throw new Error('Method not implemented.');
    }
    completarPedido(id_pedido: string): Promise<PedidoEntity> {
        throw new Error('Method not implemented.');
    }

}