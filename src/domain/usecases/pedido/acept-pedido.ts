import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface AceptarPedidoUseCase {
    execute(id_pedido: string): Promise<PedidoEntity>;
}

export class AceptarPedido implements AceptarPedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(id_pedido: string): Promise<PedidoEntity> {
        return this.pedidoRepository.aceptarPedido(id_pedido);
    }
}