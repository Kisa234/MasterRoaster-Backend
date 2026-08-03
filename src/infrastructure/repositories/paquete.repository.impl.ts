import { PaqueteDataSource } from "../../domain/datasources/paquete.datasource";
import { CreatePaqueteDto } from "../../domain/dtos/paquete/create";
import { PaqueteEntity, PaqueteConItemsEntity } from "../../domain/entities/paquete.entity";
import { PaqueteRepository } from "../../domain/repository/paquete.repository";

export class PaqueteRepositoryImpl implements PaqueteRepository {
    constructor(private readonly datasource: PaqueteDataSource) { }

    create(dto: CreatePaqueteDto): Promise<PaqueteEntity> {
        return this.datasource.create(dto);
    }
    getById(id_paquete: string): Promise<PaqueteEntity | null> {
        return this.datasource.getById(id_paquete);
    }
    getByIdConItems(id_paquete: string): Promise<PaqueteConItemsEntity | null> {
        return this.datasource.getByIdConItems(id_paquete);
    }
    getAll(incluirEliminados?: boolean): Promise<PaqueteEntity[]> {
        return this.datasource.getAll(incluirEliminados);
    }
    actualizarEstado(id_paquete: string, estado: string, extra?: { [key: string]: any }): Promise<PaqueteEntity> {
        return this.datasource.actualizarEstado(id_paquete, estado, extra);
    }
}
