import { PedidoDatasource } from '../../domain/datasources/pedido.datasource';
import { CreatePedidoDto } from '../../domain/dtos/pedido/create';
import { UpdatePedidoDto } from '../../domain/dtos/pedido/update';
import { PedidoEntity } from '../../domain/entities/pedido.entity';
import { PedidoRepository } from '../../domain/repository/pedido.repository';


export default class PedidoRepositoryImpl implements PedidoRepository {

    constructor(
        private readonly pedidoDataSource: PedidoDatasource
        
    ) { }
    createPedido( pedido:CreatePedidoDto): Promise<PedidoEntity> {
        return this.pedidoDataSource.createPedido( pedido);
    }
    getPedidoById(id: string): Promise<PedidoEntity | null> {
        return this.pedidoDataSource.getPedidoById(id);
    }
    getAllPedidos(): Promise<PedidoEntity[]> {
        return this.pedidoDataSource.getAllPedidos();
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
    completarPedido(id_pedido: string): Promise<PedidoEntity> {
        return this.pedidoDataSource.completarPedido(id_pedido);
    }

}