
import { CreateAnalisisDefectosDto } from "../dtos/analisis/defectos/create";
import { UpdateAnalisisDefectosDto } from "../dtos/analisis/defectos/update";
import { AnalisisDefectosEntity } from "../entities/analisisDefectos.entity";

export abstract class AnalisisDefectosRespository {
    abstract createAnalisisDefectos(createAnalisisDefectosDto: CreateAnalisisDefectosDto): Promise<AnalisisDefectosEntity>;
    abstract getAnalisisDefectosById(id: string): Promise<AnalisisDefectosEntity | null>;
    abstract updateAnalisisDefectos(id: string, updateAnalisisDefectosDto: UpdateAnalisisDefectosDto): Promise<AnalisisDefectosEntity>;
    abstract deleteAnalisisDefectos(id: string): Promise<AnalisisDefectosEntity>;
}