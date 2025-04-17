import { HistorialEntity } from "../../entities/historial.entity";
import { HistorialRepository } from "../../repository/historial.repository";

export interface GetHistorialByIdUseCase {
    execute(id: string): Promise<HistorialEntity|null>;
}

export class GetHistorialById implements GetHistorialByIdUseCase {
    constructor(
        private readonly historialRepository: HistorialRepository
    ){}

    async execute(id: string): Promise<HistorialEntity|null> {
        return this.historialRepository.getHistorialById(id);
    }
}