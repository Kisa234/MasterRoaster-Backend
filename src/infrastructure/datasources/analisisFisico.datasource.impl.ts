import { AnalisisFisicoDataSource } from "../../domain/datasources/analisisFisico.datasource";
import { AnalisisFisicoEntity } from "../../domain/entities/analisisFisico.entity";


export abstract class AnalisisFisicoDataSourceImpl implements AnalisisFisicoDataSource {
    getAnalisisFisicoById(id: string): Promise<AnalisisFisicoEntity | null> {
      throw new Error("Method not implemented.");
    }
    createAnalisisFisico(analisisFisico: AnalisisFisicoEntity): Promise<AnalisisFisicoEntity> {
        throw new Error("Method not implemented.");
    }
    getAnalisisFisicoByLote(id_lote: string): Promise<AnalisisFisicoEntity | null> {
        throw new Error("Method not implemented.");
    }
    updateAnalisisFisico(id: string, data: Partial<AnalisisFisicoEntity>): Promise<AnalisisFisicoEntity> {
        throw new Error("Method not implemented.");
    }

  }