import { HistorialEntity } from "../../entities/historial.entity";
import { HistorialRepository } from "../../repository/historial.repository";

export interface GetAllHistorialUseCase {
    execute():Promise<HistorialEntity[]>;
}

export class GetAllHistorial implements GetAllHistorialUseCase {
    constructor(
        private readonly historialRepository: HistorialRepository
    ){}

    async execute(): Promise<HistorialEntity[]> {
        return this.historialRepository.getAllHistorial();
    }
}
