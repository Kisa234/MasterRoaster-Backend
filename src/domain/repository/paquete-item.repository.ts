import { CreatePaqueteItemDto } from "../dtos/paquete-item/create";
import { PaqueteItemEntity } from "../entities/paquete-item.entity";

export abstract class PaqueteItemRepository {
    abstract create(dto: CreatePaqueteItemDto): Promise<PaqueteItemEntity>;
    abstract getById(id_item: string): Promise<PaqueteItemEntity | null>;
    abstract getByPaquete(id_paquete: string): Promise<PaqueteItemEntity[]>;
    abstract delete(id_item: string): Promise<PaqueteItemEntity>;
}
