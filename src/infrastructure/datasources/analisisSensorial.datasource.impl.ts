import { AnalisisSensorialDataSource } from "../../domain/datasources/analisisSensorial.datasource";
import { AnalisisSensorialEntity } from "../../domain/entities/analisisSensorial.entity";


export abstract class AnalisisSensorialDataSourceImpl implements AnalisisSensorialDataSource {
  createAnalisisSensorial(analisis: AnalisisSensorialEntity): Promise<AnalisisSensorialEntity> {
    throw new Error("Method not implemented.");
  }
  getAnalisisSensorialById(id: string): Promise<AnalisisSensorialEntity | null> {
    throw new Error("Method not implemented.");
  }
  updateAnalisisSensorial(id: string, data: Partial<AnalisisSensorialEntity>): Promise<AnalisisSensorialEntity> {
    throw new Error("Method not implemented.");
  }
    
}