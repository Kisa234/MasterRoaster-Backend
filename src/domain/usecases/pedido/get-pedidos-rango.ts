import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidosByRangoUseCase {
    execute(desde: Date, hasta: Date): Promise<PedidoEntity[]>;
}

export class GetPedidosByRango implements GetPedidosByRangoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ) {}

    async execute(desde: Date, hasta: Date): Promise<PedidoEntity[]> {
        return this.pedidoRepository.getPedidosByRango(desde, hasta);
    }
}