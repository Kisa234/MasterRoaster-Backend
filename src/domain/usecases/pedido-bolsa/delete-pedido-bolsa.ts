import { PedidoBolsaEntity } from "../../entities/pedidoBolsa.entity";
import { PedidoBolsaRepository } from "../../repository/pedido-bolsa.repository";

export interface DeletePedidoBolsaUseCase {
    execute(id: string): Promise<PedidoBolsaEntity>;
}

export class DeletePedidoBolsa implements DeletePedidoBolsaUseCase {
    constructor(private readonly repository: PedidoBolsaRepository) { }

    async execute(id: string): Promise<PedidoBolsaEntity> {
        return this.repository.deletePedidoBolsa(id);
    }
}
