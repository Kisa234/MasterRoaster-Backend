import { PedidoConLoteEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidosConLoteUseCase {
    execute(): Promise<PedidoConLoteEntity[]>;
}

export class GetPedidosConLote implements GetPedidosConLoteUseCase {

    constructor(
        private readonly pedidoRepository: PedidoRepository
    ) { }

    async execute(): Promise<PedidoConLoteEntity[]> {
        const pedidos = await this.pedidoRepository.getPedidosConLote();
        return pedidos;
    }

}