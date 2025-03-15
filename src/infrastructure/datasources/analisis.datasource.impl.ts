import { AnalisisDataSource } from "../../domain/datasources/analisis.datasource";
import { AnalisisEntity } from "../../domain/entities/analisis.entity";


export  class AnalisisDataSourceImpl implements AnalisisDataSource {
    createAnalisis(analisis: AnalisisEntity): Promise<AnalisisEntity> {
        throw new Error("Method not implemented.");
    }
    getAnalisisByLote(id_lote: string): Promise<AnalisisEntity | null> {
        throw new Error("Method not implemented.");
    }
    updateAnalisis(id: string, data: Partial<AnalisisEntity>): Promise<AnalisisEntity> {
        throw new Error("Method not implemented.");
    }
    
}