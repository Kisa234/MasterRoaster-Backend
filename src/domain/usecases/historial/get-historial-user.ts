import { HistorialEntity } from "../../entities/historial.entity";
import { HistorialRepository } from "../../repository/historial.repository";

export interface GetHistorialByUserUseCase {
    execute(id: string): Promise<HistorialEntity[]>;
}

export class GetHistorialByUser implements GetHistorialByUserUseCase {
    constructor(
        private readonly historialRepository: HistorialRepository
    ){}

    async execute(id: string): Promise<HistorialEntity[]> {
        return this.historialRepository.getHistorialByUserId(id);
    }
}