import { Tueste } from "../entities/tueste.interface";

export interface ITuesteRepository {
    getById(id: string): Promise<Tueste | null>;
    getAll(): Promise<Tueste[]>;
    create(tueste: Tueste): Promise<Tueste>;
    update(id: string, tueste: Partial<Tueste>): Promise<Tueste | null>;
    delete(id: string): Promise<boolean>;
}