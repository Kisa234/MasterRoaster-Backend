import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidosByEstadoUseCase {
    execute(estado: string): Promise<PedidoEntity[]>;
}

export class GetPedidosByEstado implements GetPedidosByEstadoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(estado: string): Promise<PedidoEntity[]> {
        return this.pedidoRepository.getPedidosByEstado(estado);
    }
}