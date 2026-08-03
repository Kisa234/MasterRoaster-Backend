import { PedidoItemDataSource } from "../../domain/datasources/pedido-item.datasource";
import { CreatePedidoItemDto } from "../../domain/dtos/pedido-item/create";
import { PedidoItemEntity } from "../../domain/entities/pedido-item.entity";
import { PedidoItemRepository } from "../../domain/repository/pedido-item.repository";

export class PedidoItemRepositoryImpl implements PedidoItemRepository {
    constructor(private readonly datasource: PedidoItemDataSource) { }

    createMany(id_pedido: string, items: CreatePedidoItemDto[]): Promise<PedidoItemEntity[]> {
        return this.datasource.createMany(id_pedido, items);
    }
    getByPedido(id_pedido: string): Promise<PedidoItemEntity[]> {
        return this.datasource.getByPedido(id_pedido);
    }
    deleteByPedido(id_pedido: string): Promise<void> {
        return this.datasource.deleteByPedido(id_pedido);
    }
}
