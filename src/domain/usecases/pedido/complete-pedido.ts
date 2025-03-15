import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface CompletarPedidoUseCase {
    execute(id_pedido: string): Promise<PedidoEntity>;
}

export class CompletarPedido implements CompletarPedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(id_pedido: string): Promise<PedidoEntity> {
        return this.pedidoRepository.completarPedido(id_pedido);
    }
}
