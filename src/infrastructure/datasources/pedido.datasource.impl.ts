import { PedidoEntity } from "../entities/pedido.entity";

export abstract class PedidoDataSource {
    abstract createPedido(pedido: PedidoEntity): Promise<PedidoEntity>;
    abstract getPedidoById(id: string): Promise<PedidoEntity | null>;
    abstract updatePedido(id: string, data: Partial<PedidoEntity>): Promise<PedidoEntity>;
    abstract deletePedido(id: string): Promise<void>;
    abstract getPedidosByEstado(estado: string): Promise<PedidoEntity[]>;
    abstract getPedidosByCliente(cliente_id: string): Promise<PedidoEntity[]>;
    abstract asignarPedido(id_pedido: string, asignado_a_id: string): Promise<PedidoEntity>;
    abstract aceptarPedido(id_pedido: string): Promise<PedidoEntity>;
    abstract completarPedido(id_pedido: string): Promise<PedidoEntity>;
}
