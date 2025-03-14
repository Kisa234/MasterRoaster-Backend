import { AnalisisRapidoDataSource } from "../../domain/datasources/analisisRapido.datasource";
import { AnalisisRapidoEntity } from "../../domain/entities/analisisRapido.entity";


export abstract class AnalisisRapidoDataSourceImpl implements AnalisisRapidoDataSource {
  createAnalisisRapido(analisis: AnalisisRapidoEntity): Promise<AnalisisRapidoEntity> {
    throw new Error("Method not implemented.");
  }
  getAnalisisRapidoById(id: string): Promise<AnalisisRapidoEntity | null> {
    throw new Error("Method not implemented.");
  }
  updateAnalisisRapido(id: string, data: Partial<AnalisisRapidoEntity>): Promise<AnalisisRapidoEntity> {
    throw new Error("Method not implemented.");
  }
    
}
  