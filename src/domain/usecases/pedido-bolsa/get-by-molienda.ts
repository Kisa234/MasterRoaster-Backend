import { PedidoBolsaEntity } from "../../entities/pedidoBolsa.entity";
import { PedidoBolsaRepository } from "../../repository/pedido-bolsa.repository";

export interface GetPedidoBolsasByMoliendaUseCase {
    execute(molienda: string): Promise<PedidoBolsaEntity[]>;
}

export class GetPedidoBolsasByMolienda implements GetPedidoBolsasByMoliendaUseCase {
    constructor(private readonly repository: PedidoBolsaRepository) { }

    async execute(molienda: string): Promise<PedidoBolsaEntity[]> {
        return this.repository.getByMolienda(molienda);
    }
}
