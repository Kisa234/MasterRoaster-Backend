import { BolsaEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface DeleteBolsaUseCase {
    execute(id: string): Promise<BolsaEntity>;
}

export class DeleteBolsa implements DeleteBolsaUseCase {
    constructor(
        private readonly bolsaRepository: BolsaRepository
    ) { }

    async execute(id: string): Promise<BolsaEntity> {
        return this.bolsaRepository.deleteBolsa(id);
    }
}