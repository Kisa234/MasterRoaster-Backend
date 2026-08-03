import { CreatePaqueteItemDto } from "../dtos/paquete-item/create";
import { PaqueteItemEntity } from "../entities/paquete-item.entity";

export abstract class PaqueteItemDataSource {
    abstract create(dto: CreatePaqueteItemDto): Promise<PaqueteItemEntity>;
    abstract getById(id_item: string): Promise<PaqueteItemEntity | null>;
    abstract getByPaquete(id_paquete: string): Promise<PaqueteItemEntity[]>;
    // Hard delete real (no soft-delete): PaqueteItem no tiene campo `eliminado`
    // en el schema — vive y muere junto al Paquete mientras está EN_PREPARACION.
    abstract delete(id_item: string): Promise<PaqueteItemEntity>;
}
