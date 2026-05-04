import { PedidoConLoteEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidoConLoteUseCase {
    execute(id: string): Promise<PedidoConLoteEntity>;
}

export class GetPedidoConLote implements GetPedidoConLoteUseCase {

    constructor(
        private readonly pedidoRepository: PedidoRepository
    ) { }

    async execute(id: string): Promise<PedidoConLoteEntity> {
        const pedido = await this.pedidoRepository.getPedidoConLote(id);

        if (!pedido) {
            throw new Error("No existe el pedido");
        }

        return pedido;
    }

}