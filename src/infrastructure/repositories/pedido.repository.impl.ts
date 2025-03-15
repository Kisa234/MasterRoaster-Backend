import { PedidoDataSource } from '../../domain/datasources/pedido.datasource';
import { UpdatePedidoDto } from '../../domain/dtos/pedido/update';
import { PedidoEntity } from '../../domain/entities/pedido.entity';
import { PedidoRepository } from '../../domain/repository/pedido.repository';


export class PedidoRepositoryImpl implements PedidoRepository {

    constructor(
        private readonly pedidoDataSource: PedidoDataSource
    ) { }

    createPedido(pedido: PedidoEntity): Promise<PedidoEntity> {
        return this.pedidoDataSource.createPedido(pedido);
    }
    getPedidoById(id: string): Promise<PedidoEntity | null> {
        return this.pedidoDataSource.getPedidoById(id);
    }
    updatePedido(id: string,updatePedidoDto:UpdatePedidoDto ): Promise<PedidoEntity> {
        return this.pedidoDataSource.updatePedido(id, updatePedidoDto);
    }
    deletePedido(id: string): Promise<PedidoEntity> {
        return this.pedidoDataSource.deletePedido(id);
    }
    getPedidosByEstado(estado: string): Promise<PedidoEntity[]> {
        return this.pedidoDataSource.getPedidosByEstado(estado);
    }
    getPedidosByCliente(cliente_id: string): Promise<PedidoEntity[]> {
        return this.pedidoDataSource.getPedidosByCliente(cliente_id);
    }
    asignarPedido(id_pedido: string, asignado_a_id: string): Promise<PedidoEntity> {
        return this.pedidoDataSource.asignarPedido(id_pedido, asignado_a_id);
    }
    aceptarPedido(id_pedido: string): Promise<PedidoEntity> {
        return this.pedidoDataSource.aceptarPedido(id_pedido);
    }
    completarPedido(id_pedido: string): Promise<PedidoEntity> {
        return this.pedidoDataSource.completarPedido(id_pedido);
    }

}