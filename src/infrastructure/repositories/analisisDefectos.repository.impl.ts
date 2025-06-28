import { AnalisisDefectosDataSource } from "../../domain/datasources/analisisDefectos.datasource";
import { CreateAnalisisDefectosDto } from "../../domain/dtos/analisis/defectos/create";
import { UpdateAnalisisDefectosDto } from "../../domain/dtos/analisis/defectos/update";
import { AnalisisDefectosEntity } from "../../domain/entities/analisisDefectos.entity";
import { AnalisisDefectosRespository } from "../../domain/repository/analisisDefectos.repository";


export class AnalisisDefectosRespositoryImpl implements AnalisisDefectosRespository {
    constructor(
        private readonly analisisDefectosDataSource: AnalisisDefectosDataSource
    ){}

    createAnalisisDefectos(createAnalisisDefectosDto: CreateAnalisisDefectosDto): Promise<AnalisisDefectosEntity> {
        return this.analisisDefectosDataSource.createAnalisisDefectos(createAnalisisDefectosDto)
    }
    getAnalisisDefectosById(id: string): Promise<AnalisisDefectosEntity | null> {
        return this.analisisDefectosDataSource.getAnalisisDefectosById(id);
    }
    updateAnalisisDefectos(id: string, updateAnalisisDefectosDto: UpdateAnalisisDefectosDto): Promise<AnalisisDefectosEntity> {
        return this.analisisDefectosDataSource.updateAnalisisDefectos(id, updateAnalisisDefectosDto);
    }
    deleteAnalisisDefectos(id: string): Promise<AnalisisDefectosEntity> {
        return this.analisisDefectosDataSource.deleteAnalisisDefectos(id);
    }
   
}