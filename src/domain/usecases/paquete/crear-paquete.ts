import { CreatePaqueteDto } from "../../dtos/paquete/create";
import { PaqueteEntity } from "../../entities/paquete.entity";
import { PaqueteRepository } from "../../repository/paquete.repository";

export interface CrearPaqueteUseCase {
    execute(dto: CreatePaqueteDto): Promise<PaqueteEntity>;
}

export class CrearPaquete implements CrearPaqueteUseCase {
    constructor(private readonly paqueteRepo: PaqueteRepository) { }

    async execute(dto: CreatePaqueteDto): Promise<PaqueteEntity> {
        return this.paqueteRepo.create(dto);
    }
}
