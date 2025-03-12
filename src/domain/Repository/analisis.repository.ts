import { AnalisisEntity } from "../entities/analisis.entity";

export abstract class AnalisisRepository {
    abstract createAnalisis(analisis: AnalisisEntity): Promise<AnalisisEntity>;
    abstract getAnalisisByLote(id_lote: string): Promise<AnalisisEntity | null>;
    abstract updateAnalisis(id: string, data: Partial<AnalisisEntity>): Promise<AnalisisEntity>;
}