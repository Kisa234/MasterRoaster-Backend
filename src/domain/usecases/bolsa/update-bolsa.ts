import { UpdateBolsaDto } from "../../dtos/bolsa/update";
import { BolsaEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface UpdateBolsaUseCase {
    execute(id: string, updateBolsaDto: UpdateBolsaDto): Promise<BolsaEntity>;
}

export class UpdateBolsa implements UpdateBolsaUseCase {
    constructor(
        private readonly bolsaRepository: BolsaRepository,
    ) { }

    async execute(id: string, updateBolsaDto: UpdateBolsaDto): Promise<BolsaEntity> {
        return this.bolsaRepository.updateBolsa(id, updateBolsaDto);
    }
}