import { AnalisisSensorialEntity } from "../entities/analisisSensorial.entity";
import { CreateAnalisisSensorialDTO } from "../dtos/analisis/sensorial/create";
import { UpdateAnalisisSensorialDTO } from "../dtos/analisis/sensorial/update";

export abstract class AnalisisSensorialDataSource {
    abstract createAnalisisSensorial(createAnalisisSensorialDTO:CreateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity>;
    abstract getAnalisisSensorialById(id: string): Promise<AnalisisSensorialEntity | null>;
    abstract updateAnalisisSensorial(id: string, updateAnalisisSensorialDTO:UpdateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity>;
}