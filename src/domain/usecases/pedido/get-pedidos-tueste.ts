import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidosOrdenTuesteUseCase {
    execute(): Promise<PedidoEntity[]>;
}

export class GetPedidosOrdenTueste implements GetPedidosOrdenTuesteUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(): Promise<PedidoEntity[]> {
        return this.pedidoRepository.getPedidosOrdenTueste();
    }
}