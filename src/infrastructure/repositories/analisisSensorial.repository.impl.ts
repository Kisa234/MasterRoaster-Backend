import { CreateAnalisisSensorialDTO } from "../../domain/dtos/analisis/sensorial/create";
import { UpdateAnalisisSensorialDTO } from "../../domain/dtos/analisis/sensorial/update";
import { AnalisisSensorialEntity } from "../../domain/entities/analisisSensorial.entity";
import { AnalisisSensorialRepository } from "../../domain/repository/analisisSensorial.repository";
import { AnalisisSensorialDataSource } from '../../domain/datasources/analisisSensorial.datasource';


export class AnalisisSensorialRepositoryImpl implements AnalisisSensorialRepository {

    constructor(
        private readonly analisis: AnalisisSensorialDataSource
    ) {}

    createAnalisisSensorial(createAnalisisSensorialDTO: CreateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity> {
        return this.analisis.createAnalisisSensorial(createAnalisisSensorialDTO);
    }
    getAnalisisSensorialById(id: string): Promise<AnalisisSensorialEntity | null> {
        return this.analisis.getAnalisisSensorialById(id);
    }
    updateAnalisisSensorial(id: string, updateAnalisisSensorialDTO: UpdateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity> {
        return this.analisis.updateAnalisisSensorial(id, updateAnalisisSensorialDTO);
    }
    deleteAnalisisSensorial(id: string): Promise<AnalisisSensorialEntity> {
        return this.analisis.deleteAnalisisSensorial(id);
    }
    getAllAnalisisSensorial(): Promise<AnalisisSensorialEntity[]> {
        return this.analisis.getAllAnalisisSensorial();
    }
    

}