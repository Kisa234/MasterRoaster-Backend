import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidos {
    execute(): Promise<PedidoEntity[]>;
}

export class GetAllPedidos implements GetPedidos {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(): Promise<PedidoEntity[]> {
        return this.pedidoRepository.getAllPedidos();
    }
}