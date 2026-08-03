import { CreatePaqueteDto } from "../dtos/paquete/create";
import { PaqueteEntity, PaqueteConItemsEntity } from "../entities/paquete.entity";

export abstract class PaqueteRepository {
    abstract create(dto: CreatePaqueteDto): Promise<PaqueteEntity>;
    abstract getById(id_paquete: string): Promise<PaqueteEntity | null>;
    abstract getByIdConItems(id_paquete: string): Promise<PaqueteConItemsEntity | null>;
    abstract getAll(incluirEliminados?: boolean): Promise<PaqueteEntity[]>;
    abstract actualizarEstado(id_paquete: string, estado: string, extra?: { [key: string]: any }): Promise<PaqueteEntity>;
}
