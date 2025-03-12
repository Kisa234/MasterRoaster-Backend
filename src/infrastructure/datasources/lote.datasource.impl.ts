import { LoteEntity } from "../entities/lote.entity";

export abstract class LoteDataSource {
    abstract createLote(lote: LoteEntity): Promise<LoteEntity>;
    abstract getLoteById(id: string): Promise<LoteEntity | null>;
    abstract updateLote(id: string, data: Partial<LoteEntity>): Promise<LoteEntity>;
    abstract deleteLote(id: string): Promise<void>;
    abstract getLotesByEstado(estado: string): Promise<LoteEntity[]>;
    
  }