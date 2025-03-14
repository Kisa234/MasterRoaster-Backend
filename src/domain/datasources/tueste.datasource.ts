import { CreateTuesteDto } from "../dtos/tueste/create";
import { UpdateTuesteDto } from "../dtos/tueste/update";
import { TuesteEntity } from "../entities/tueste.entity";

export abstract class TuesteDataSource {
    abstract createTueste(createTuesteDto:CreateTuesteDto): Promise<TuesteEntity>;
    abstract getTuesteById(id: string): Promise<TuesteEntity | null>;
    abstract updateTueste(id: string, updateTuesteDto:UpdateTuesteDto): Promise<TuesteEntity>;
    abstract deleteTueste(id: string): Promise<TuesteEntity>;
    abstract getTostadosByFecha(fecha: Date): Promise<TuesteEntity[]>;
}