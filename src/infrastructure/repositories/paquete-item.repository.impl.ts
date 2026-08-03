import { PaqueteItemDataSource } from "../../domain/datasources/paquete-item.datasource";
import { CreatePaqueteItemDto } from "../../domain/dtos/paquete-item/create";
import { PaqueteItemEntity } from "../../domain/entities/paquete-item.entity";
import { PaqueteItemRepository } from "../../domain/repository/paquete-item.repository";

export class PaqueteItemRepositoryImpl implements PaqueteItemRepository {
    constructor(private readonly datasource: PaqueteItemDataSource) { }

    create(dto: CreatePaqueteItemDto): Promise<PaqueteItemEntity> {
        return this.datasource.create(dto);
    }
    getById(id_item: string): Promise<PaqueteItemEntity | null> {
        return this.datasource.getById(id_item);
    }
    getByPaquete(id_paquete: string): Promise<PaqueteItemEntity[]> {
        return this.datasource.getByPaquete(id_paquete);
    }
    delete(id_item: string): Promise<PaqueteItemEntity> {
        return this.datasource.delete(id_item);
    }
}
