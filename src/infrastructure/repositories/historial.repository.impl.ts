import { HistorialDataSource } from "../../domain/datasources/historial.datasource";
import { CreateHistorialDto } from "../../domain/dtos/historial/create";
import { HistorialEntity } from "../../domain/entities/historial.entity";
import { HistorialRepository } from "../../domain/repository/historial.repository";

export class HistorialRepositoryImpl implements HistorialRepository {

    constructor(
        private readonly datasource: HistorialDataSource
    ) {}
    
    createHistorial(createLoteHistorialDto: CreateHistorialDto): Promise<HistorialEntity> {
        return this.datasource.createHistorial(createLoteHistorialDto);
    }

    getHistorialById(id: string): Promise<HistorialEntity | null> {
        return this.datasource.getHistorialById(id);
    }

    getHistorialByUserId(id: string): Promise<HistorialEntity[]> {
        return this.datasource.getHistorialByUserId(id);
    }
    getHistorialByEntidadId(id: string): Promise<HistorialEntity[]> {
        return this.datasource.getHistorialByEntidadId(id);
    }
    getAllHistorial(): Promise<HistorialEntity[]> {
        return this.datasource.getAllHistorial();
    }
    
}