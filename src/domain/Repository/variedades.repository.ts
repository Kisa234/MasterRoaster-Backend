import { Variedades } from "../entities/variedades.interface";

export interface IVariedadesRepository {
    getById(id: string): Promise<Variedades | null>;
    getAll(): Promise<Variedades[]>;
    create(variedad: Variedades): Promise<Variedades>;
    update(id: string, variedad: Partial<Variedades>): Promise<Variedades | null>;
    delete(id: string): Promise<boolean>;
}