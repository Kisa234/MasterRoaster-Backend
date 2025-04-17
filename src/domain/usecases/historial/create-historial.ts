import { CreateHistorialDto } from "../../dtos/historial/create";
import { HistorialEntity } from "../../entities/historial.entity";
import { HistorialRepository } from "../../repository/historial.repository";

export interface CreateHistorialUseCase {
    execute(createHistorialDto: CreateHistorialDto): Promise<HistorialEntity>;
}

export class CreateHistorial implements CreateHistorialUseCase {
    constructor(
        private readonly historialRepository: HistorialRepository
    ){}

    async execute( createHistorialDto: CreateHistorialDto): Promise<HistorialEntity> {
        return this.historialRepository.createHistorial(createHistorialDto);
    }
}