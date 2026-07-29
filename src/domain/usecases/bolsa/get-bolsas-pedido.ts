import { BolsaEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface GetBolsasByPedidoIdUseCase {
    execute(id: string): Promise<BolsaEntity[]>;
}

export class GetBolsasByPedidoId implements GetBolsasByPedidoIdUseCase {
    constructor(
        private readonly bolsaRepository: BolsaRepository
    ) { }

    async execute(id: string): Promise<BolsaEntity[]> {
        return this.bolsaRepository.getBolsasByPedidoId(id);
    }
}