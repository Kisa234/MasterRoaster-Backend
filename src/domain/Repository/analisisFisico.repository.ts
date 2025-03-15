import { CreateAnalisisFisicoDto } from "../dtos/analisis/fisico/create";
import { UpdateAnalisisFisicoDto } from "../dtos/analisis/fisico/update";
import { AnalisisFisicoEntity } from "../entities/analisisFisico.entity";

export abstract class AnalisisFisicoRepository {
    
        abstract createAnalisisFisico(createAnalisisFisicoDto:CreateAnalisisFisicoDto): Promise<AnalisisFisicoEntity>;
        abstract getAnalisisFisicoById(id: string): Promise<AnalisisFisicoEntity | null>;
        abstract updateAnalisisFisico(id: string, updateAnalisisFisicoDto:UpdateAnalisisFisicoDto): Promise<AnalisisFisicoEntity>;
  }