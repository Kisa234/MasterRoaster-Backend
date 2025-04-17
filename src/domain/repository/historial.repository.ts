import { CreateHistorialDto } from "../dtos/historial/create";
import { HistorialEntity } from "../entities/historial.entity";
import { UserEntity } from "../entities/user.entity";


export abstract class HistorialRepository {
    abstract createHistorial(createLoteHistorialDto: CreateHistorialDto): Promise<HistorialEntity>;
    abstract getHistorialByUserId(id: string): Promise<HistorialEntity[]>;
    abstract getHistorialByEntidadId(id: string): Promise<HistorialEntity[]>;
    abstract getAllHistorial(): Promise<HistorialEntity[]>;
    abstract getHistorialById(id: string): Promise<HistorialEntity | null>;
}