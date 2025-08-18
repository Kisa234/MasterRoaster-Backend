import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidosByLoteUseCase {
    execute(id_lote: string): Promise<PedidoEntity[]>;
}

export class GetPedidosByLote implements GetPedidosByLoteUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository
    ){}

    async execute(id_lote: string): Promise<PedidoEntity[]> {
        return this.pedidoRepository.getPedidosByLote(id_lote);
    }
}