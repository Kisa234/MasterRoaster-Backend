import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidosByClienteUseCase {
    execute(cliente_id: string): Promise<PedidoEntity[]>;
}

export class GetPedidosByCliente implements GetPedidosByClienteUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(cliente_id: string): Promise<PedidoEntity[]> {
        return this.pedidoRepository.getPedidosByCliente(cliente_id);
    }
}