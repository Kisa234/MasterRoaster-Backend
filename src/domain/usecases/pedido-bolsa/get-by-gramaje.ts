import { PedidoBolsaEntity } from "../../entities/pedidoBolsa.entity";
import { PedidoBolsaRepository } from "../../repository/pedido-bolsa.repository";

export interface GetPedidoBolsasByGramajeUseCase {
    execute(gramaje: number): Promise<PedidoBolsaEntity[]>;
}

export class GetPedidoBolsasByGramaje implements GetPedidoBolsasByGramajeUseCase {
    constructor(private readonly repository: PedidoBolsaRepository) { }

    async execute(gramaje: number): Promise<PedidoBolsaEntity[]> {
        return this.repository.getByGramaje(gramaje);
    }
}
