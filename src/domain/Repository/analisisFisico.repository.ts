import { AnalisisFisicoEntity } from "../entities/analisisFisico.entity";

export abstract class AnalisisFisicoRepository {
    abstract createAnalisisFisico(analisis: AnalisisFisicoEntity): Promise<AnalisisFisicoEntity>;
    abstract getAnalisisFisicoById(id: string): Promise<AnalisisFisicoEntity | null>;
    abstract updateAnalisisFisico(id: string, data: Partial<AnalisisFisicoEntity>): Promise<AnalisisFisicoEntity>;
  }