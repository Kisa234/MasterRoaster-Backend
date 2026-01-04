import { IngresoCafeDataSource } from "../../domain/datasources/ingreso-cafe.datasource";
import { CreateIngresoCafeDto } from "../../domain/dtos/lotes/ingreso-cafe/create";
import { IngresoCafeEntity } from "../../domain/entities/ingreso-cafe.entity";
import { IngresoCafeRepository } from "../../domain/repository/ingreso-cafe.repository";

export class IngresoCafeRepositoryImpl implements IngresoCafeRepository {

    constructor(
        private readonly ingresoCafeDataSource: IngresoCafeDataSource
    ) {}

    createIngresoCafe(
        createIngresoCafeDto: CreateIngresoCafeDto
    ): Promise<IngresoCafeEntity> {
        return this.ingresoCafeDataSource.createIngresoCafe(createIngresoCafeDto);
    }

    getIngresoCafeById(id: string): Promise<IngresoCafeEntity | null> {
        return this.ingresoCafeDataSource.getIngresoCafeById(id);
    }

    getAllIngresosCafe(): Promise<IngresoCafeEntity[]> {
        return this.ingresoCafeDataSource.getAllIngresosCafe();
    }

    getIngresosByLote(id_lote: string): Promise<IngresoCafeEntity[]> {
        return this.ingresoCafeDataSource.getIngresosByLote(id_lote);
    }

    deleteIngresoCafe(id: string): Promise<IngresoCafeEntity> {
        return this.ingresoCafeDataSource.deleteIngresoCafe(id);
    }
}
