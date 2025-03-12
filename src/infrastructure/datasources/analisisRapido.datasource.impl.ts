import { AnalisisRapidoEntity } from "../entities/analisisRapido.entity";

export abstract class AnalisisRapidoDataSource {
    abstract createAnalisisRapido(analisis: AnalisisRapidoEntity): Promise<AnalisisRapidoEntity>;
    abstract getAnalisisRapidoById(id: string): Promise<AnalisisRapidoEntity | null>;
    abstract updateAnalisisRapido(id: string, data: Partial<AnalisisRapidoEntity>): Promise<AnalisisRapidoEntity>;
  }
  