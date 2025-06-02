import { AnalisisEntity } from "../entities/analisis.entity";
import { CreateAnalisisDto } from '../dtos/analisis/analisis/create';
import { UpdateAnalisisDto } from '../dtos/analisis/analisis/update';
import { AnalisisFisicoEntity } from "../entities/analisisFisico.entity";
import { AnalisisSensorialEntity } from "../entities/analisisSensorial.entity";

export abstract class AnalisisDataSource {
    abstract createAnalisis(createAnalisisDto:CreateAnalisisDto): Promise<AnalisisEntity>;
    abstract getAnalisisById(id_lote: string): Promise<AnalisisEntity | null>;
    abstract updateAnalisis(id: string, updateAnalisisDto:UpdateAnalisisDto): Promise<AnalisisEntity>;
    abstract deleteAnalisis(id: string): Promise<AnalisisEntity>;
    abstract getAllAnalisis(): Promise<AnalisisEntity[]>;
    abstract getAnalisisByLoteId(id_lote: string): Promise<AnalisisEntity | null>;
    // abstract getAnalisisFSByLoteId(id:string) : Promise<{ AnalisisFisicoEntity: AnalisisFisicoEntity, AnalisisSensorialEntity: AnalisisSensorialEntity }>;
}