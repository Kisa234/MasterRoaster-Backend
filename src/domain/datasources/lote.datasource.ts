import { CreateLoteDto } from "../dtos/lote/create";
import { LoteEntity } from "../entities/lote.entity";
import { UpdateLoteDto } from '../dtos/lote/update';

export abstract class LoteDataSource {
    abstract createLote(createLoteDto : CreateLoteDto): Promise<LoteEntity>;
    abstract getLoteById(id: string): Promise<LoteEntity | null>;
    abstract updateLote(id: string, updateLoteDto:UpdateLoteDto): Promise<LoteEntity>;
    abstract deleteLote(id: string): Promise<LoteEntity>;
    abstract getLotes(): Promise<LoteEntity[]>;
  }