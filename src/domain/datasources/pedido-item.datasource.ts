import { CreatePedidoItemDto } from "../dtos/pedido-item/create";
import { PedidoItemEntity } from "../entities/pedido-item.entity";

export abstract class PedidoItemDataSource {
    abstract createMany(id_pedido: string, items: CreatePedidoItemDto[]): Promise<PedidoItemEntity[]>;
    abstract getByPedido(id_pedido: string): Promise<PedidoItemEntity[]>;
    abstract deleteByPedido(id_pedido: string): Promise<void>;
}
