import { BolsaEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface GetBolsasUseCase {
    execute(): Promise<BolsaEntity[]>;
}

export class GetBolsas implements GetBolsasUseCase {
    constructor(
        private readonly bolsaRepository: BolsaRepository
    ) { }

    async execute(): Promise<BolsaEntity[]> {
        return this.bolsaRepository.getBolsas();
    }
}