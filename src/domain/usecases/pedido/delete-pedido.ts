import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface DeletePedidoUseCase {
    execute(id: string): Promise<PedidoEntity>;
}

export class DeletePedido implements DeletePedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(id: string): Promise<PedidoEntity> {
        return this.pedidoRepository.deletePedido(id);
    }
}