import { AnalisisDefectos } from "../entities/analisisDefectos.interface";

export interface IAnalisisDefectosRepository {
    getById(id: string): Promise<AnalisisDefectos | null>;
    getAll(): Promise<AnalisisDefectos[]>;
    create(analisis: AnalisisDefectos): Promise<AnalisisDefectos>;
    update(id: string, analisis: Partial<AnalisisDefectos>): Promise<AnalisisDefectos | null>;
    delete(id: string): Promise<boolean>;
}
