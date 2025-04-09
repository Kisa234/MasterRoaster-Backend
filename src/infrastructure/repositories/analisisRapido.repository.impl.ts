import { AnalisisRapidoDataSource } from "../../domain/datasources/analisisRapido.datasource";
import { UpdateAnalisisDto } from "../../domain/dtos/analisis/analisis/update";
import { CreateAnalisisRapidoDto } from "../../domain/dtos/analisis/rapido/create";
import { AnalisisRapidoEntity } from "../../domain/entities/analisisRapido.entity";
import { AnalisisRapidoRepository } from "../../domain/repository/analisisRapido.repository";
import { UpdateAnalisisRapidoDto } from '../../domain/dtos/analisis/rapido/update';


export class AnalisisRapidoRepositoryImpl implements AnalisisRapidoRepository {
    
    constructor(
        private readonly analisis: AnalisisRapidoDataSource
    ){}
    
    createAnalisisRapido(createAnalisisRapidoDto: CreateAnalisisRapidoDto): Promise<AnalisisRapidoEntity> {
        return this.analisis.createAnalisisRapido(createAnalisisRapidoDto);
    }
    getAnalisisRapidoById(id: string): Promise<AnalisisRapidoEntity | null> {
        return this.analisis.getAnalisisRapidoById(id);
    }
    updateAnalisisRapido(id: string, updateAnalisisRapidoDto:UpdateAnalisisRapidoDto ): Promise<AnalisisRapidoEntity> {
        return this.analisis.updateAnalisisRapido(id,updateAnalisisRapidoDto );
    }
    deleteAnalisisRapido(id: string): Promise<AnalisisRapidoEntity> {
        return this.analisis.deleteAnalisisRapido(id);
    }
    getAllAnalisisRapido(): Promise<AnalisisRapidoEntity[]> {
        return this.analisis.getAllAnalisisRapido();
    }
    
    
}