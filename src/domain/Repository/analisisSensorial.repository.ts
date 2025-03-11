import { AnalisisSensorial } from "../entities/analisisSensorial.interface";

export interface IAnalisisSensorialRepository {
    getById(id: string): Promise<AnalisisSensorial | null>;
    getAll(): Promise<AnalisisSensorial[]>;
    create(analisis: AnalisisSensorial): Promise<AnalisisSensorial>;
    update(id: string, analisis: Partial<AnalisisSensorial>): Promise<AnalisisSensorial | null>;
    delete(id: string): Promise<boolean>;
}