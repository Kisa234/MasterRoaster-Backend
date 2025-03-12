import { AnalisisSensorialEntity } from "../entities/analisisSensorial.entity";

export abstract class AnalisisSensorialDataSource {
    abstract createAnalisisSensorial(analisis: AnalisisSensorialEntity): Promise<AnalisisSensorialEntity>;
    abstract getAnalisisSensorialById(id: string): Promise<AnalisisSensorialEntity | null>;
    abstract updateAnalisisSensorial(id: string, data: Partial<AnalisisSensorialEntity>): Promise<AnalisisSensorialEntity>;
}