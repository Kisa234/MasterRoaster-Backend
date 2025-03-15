import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";


export interface GetPedidoUseCase {
    execute(id: string): Promise<PedidoEntity | null>;
}

export class GetPedido implements GetPedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(id: string): Promise<PedidoEntity | null> {
        return this.pedidoRepository.getPedidoById(id);
    }
}
