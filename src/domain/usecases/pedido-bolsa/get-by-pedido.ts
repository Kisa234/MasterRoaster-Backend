import { PedidoBolsaEntity } from "../../entities/pedidoBolsa.entity";
import { PedidoBolsaRepository } from "../../repository/pedido-bolsa.repository";

export interface GetPedidoBolsasByPedidoUseCase {
    execute(id_pedido: string): Promise<PedidoBolsaEntity[]>;
}

export class GetPedidoBolsasByPedido implements GetPedidoBolsasByPedidoUseCase {
    constructor(private readonly repository: PedidoBolsaRepository) { }

    async execute(id_pedido: string): Promise<PedidoBolsaEntity[]> {
        return this.repository.getByPedido(id_pedido);
    }
}
