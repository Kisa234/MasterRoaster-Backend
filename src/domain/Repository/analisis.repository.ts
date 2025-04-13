import { CreateAnalisisDto } from "../dtos/analisis/analisis/create";
import { UpdateAnalisisDto } from "../dtos/analisis/analisis/update";
import { AnalisisEntity } from "../entities/analisis.entity";

export abstract class AnalisisRepository {

        abstract createAnalisis(createAnalisisDto:CreateAnalisisDto): Promise<AnalisisEntity>;
        abstract getAnalisisById(id_lote: string): Promise<AnalisisEntity | null>;
        abstract updateAnalisis(id: string, updateAnalisisDto:UpdateAnalisisDto): Promise<AnalisisEntity>;
        abstract deleteAnalisis(id: string): Promise<AnalisisEntity>;
        abstract getAllAnalisis(): Promise<AnalisisEntity[]>;

}