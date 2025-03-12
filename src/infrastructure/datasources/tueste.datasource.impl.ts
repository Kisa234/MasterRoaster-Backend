import { TuesteEntity } from "../entities/tueste.entity";

export abstract class TuesteDataSource {
    abstract createTueste(tueste: TuesteEntity): Promise<TuesteEntity>;
    abstract getTuesteById(id: string): Promise<TuesteEntity | null>;
    abstract updateTueste(id: string, data: Partial<TuesteEntity>): Promise<TuesteEntity>;
    abstract deleteTueste(id: string): Promise<void>;
    abstract getTostadosByFecha(fecha: Date): Promise<TuesteEntity[]>;
  }