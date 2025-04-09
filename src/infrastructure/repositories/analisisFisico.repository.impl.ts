import { AnalisisFisicoDataSource } from "../../domain/datasources/analisisFisico.datasource";
import { CreateAnalisisFisicoDto } from "../../domain/dtos/analisis/fisico/create";
import { UpdateAnalisisFisicoDto } from "../../domain/dtos/analisis/fisico/update";
import { AnalisisFisicoEntity } from "../../domain/entities/analisisFisico.entity";
import { AnalisisFisicoRepository } from "../../domain/repository/analisisFisico.repository";


export class AnalisisFisicoRepositoryImpl implements AnalisisFisicoRepository {

    constructor(
        private readonly analisis: AnalisisFisicoDataSource
    ) {}

    createAnalisisFisico(createAnalisisFisicoDTO: CreateAnalisisFisicoDto): Promise<AnalisisFisicoEntity> {
        return this.analisis.createAnalisisFisico(createAnalisisFisicoDTO);
    }
    getAnalisisFisicoById(id: string): Promise<AnalisisFisicoEntity | null> {
        return this.analisis.getAnalisisFisicoById(id);
    }
    updateAnalisisFisico(id: string, updateAnalisisFisicoDTO: UpdateAnalisisFisicoDto): Promise<AnalisisFisicoEntity> {
        return this.analisis.updateAnalisisFisico(id, updateAnalisisFisicoDTO);
    }
    deleteAnalisisFisico(id: string): Promise<AnalisisFisicoEntity> {
        return this.analisis.deleteAnalisisFisico(id);
    }
    getAllAnalisisFisico(): Promise<AnalisisFisicoEntity[]> {
        return this.analisis.getAllAnalisisFisico();
    }
    

}