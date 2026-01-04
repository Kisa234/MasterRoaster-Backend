import { CambioDataSource } from "../../domain/datasources/cambio.datasource";
import { CreateCambioDto } from "../../domain/dtos/cambio/create";
import { CambioEntity } from "../../domain/entities/cambio.entity";
import { CambioRepository } from "../../domain/repository/cambio.repository";

export class CambioRepositoryImpl implements CambioRepository {

    constructor(
        private readonly cambioDataSource: CambioDataSource
    ) {}

    createCambio(
        createCambioDto: CreateCambioDto
    ): Promise<CambioEntity> {
        return this.cambioDataSource.createCambio(createCambioDto);
    }

    getCambiosByEntidad(
        entidad: string,
        id_entidad: string
    ): Promise<CambioEntity[]> {
        return this.cambioDataSource.getCambiosByEntidad(entidad, id_entidad);
    }

    getCambiosByUser(
        id_user: string
    ): Promise<CambioEntity[]> {
        return this.cambioDataSource.getCambiosByUser(id_user);
    }
}
