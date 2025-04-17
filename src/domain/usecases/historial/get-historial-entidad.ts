import { HistorialEntity } from "../../entities/historial.entity";
import { HistorialRepository } from "../../repository/historial.repository";

export interface GetHistorialByEntidadUseCase {
    execute(id: string): Promise<HistorialEntity[]>;
}

export class GetHistorialByEntidad implements GetHistorialByEntidadUseCase {
    constructor(
        private readonly historialRepository: HistorialRepository
    ){}

    async execute(id: string): Promise<HistorialEntity[]> {
        return this.historialRepository.getHistorialByEntidadId(id);
    }
}