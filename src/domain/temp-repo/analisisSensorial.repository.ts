
import { CreateAnalisisSensorialDTO } from "../dtos/analisis/sensorial/create";
import { UpdateAnalisisSensorialDTO } from "../dtos/analisis/sensorial/update";
import { AnalisisSensorialEntity } from "../entities/analisisSensorial.entity";

export abstract class AnalisisSensorialRepository { 
    abstract createAnalisisSensorial(createAnalisisSensorialDTO:CreateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity>;
    abstract getAnalisisSensorialById(id: string): Promise<AnalisisSensorialEntity | null>;
    abstract updateAnalisisSensorial(id: string, updateAnalisisSensorialDTO:UpdateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity>;
    abstract deleteAnalisisSensorial(id: string): Promise<AnalisisSensorialEntity>;
    abstract getAllAnalisisSensorial(): Promise<AnalisisSensorialEntity[]>;
}