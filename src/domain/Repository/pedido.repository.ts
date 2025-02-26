import { Pedido } from "../interfaces/pedido.interface";

export interface IPedidoRepository {
    getById(id: string): Promise<Pedido | null>;
    getAll(): Promise<Pedido[]>;
    create(pedido: Pedido): Promise<Pedido>;
    update(id: string, pedido: Partial<Pedido>): Promise<Pedido | null>;
    delete(id: string): Promise<boolean>;
}