import { CreatePaqueteDto } from "../../dtos/paquete/create";
import { PaqueteEntity } from "../../entities/paquete.entity";
import { PaqueteRepository } from "../../repository/paquete.repository";

export interface CrearPaqueteUseCase {
    execute(dto: CreatePaqueteDto): Promise<PaqueteEntity>;
}

export class CrearPaquete implements CrearPaqueteUseCase {
    constructor(private readonly paqueteRepo: PaqueteRepository) { }

    async execute(dto: CreatePaqueteDto): Promise<PaqueteEntity> {
        const total = await this.paqueteRepo.countTotal();
        const numero_correlativo = `PAQ-${(total + 1).toString().padStart(6, '0')}`;

        return this.paqueteRepo.create(dto, numero_correlativo);
    }
}