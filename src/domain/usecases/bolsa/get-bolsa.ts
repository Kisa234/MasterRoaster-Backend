import { BolsaEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface GetBolsaUseCase {
    execute(id: string): Promise<BolsaEntity | null>;
}

export class GetBolsaById implements GetBolsaUseCase {
    constructor(
        private readonly bolsaRepository: BolsaRepository
    ) { }

    async execute(id: string): Promise<BolsaEntity | null> {
        return this.bolsaRepository.getBolsaById(id);
    }
}