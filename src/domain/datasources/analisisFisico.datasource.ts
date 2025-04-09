import { AnalisisFisicoEntity } from "../entities/analisisFisico.entity";
import { CreateAnalisisFisicoDto } from '../dtos/analisis/fisico/create';
import { UpdateAnalisisFisicoDto } from '../dtos/analisis/fisico/update';

export abstract class AnalisisFisicoDataSource {
    abstract createAnalisisFisico(createAnalisisFisicoDto:CreateAnalisisFisicoDto): Promise<AnalisisFisicoEntity>;
    abstract getAnalisisFisicoById(id: string): Promise<AnalisisFisicoEntity | null>;
    abstract updateAnalisisFisico(id: string, updateAnalisisFisicoDto:UpdateAnalisisFisicoDto): Promise<AnalisisFisicoEntity>;
    abstract deleteAnalisisFisico(id: string): Promise<AnalisisFisicoEntity>;
    abstract getAllAnalisisFisico(): Promise<AnalisisFisicoEntity[]>;
}