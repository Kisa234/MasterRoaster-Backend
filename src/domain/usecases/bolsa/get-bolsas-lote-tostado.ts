import { BolsaEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface GetBolsasByLoteTostadoIdUseCase {
    execute(id: string): Promise<BolsaEntity[]>;
}

export class GetBolsasByLoteTostadoId implements GetBolsasByLoteTostadoIdUseCase {
    constructor(
        private readonly bolsaRepository: BolsaRepository
    ) { }

    async execute(id: string): Promise<BolsaEntity[]> {
        return this.bolsaRepository.getBolsasByLoteTostadoId(id);
    }
}