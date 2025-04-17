import { CreateLoteDto } from "../dtos/lotes/lote/create";
import { UpdateLoteDto } from "../dtos/lotes/lote/update";
import { LoteEntity } from "../entities/lote.entity";

export abstract class LoteRepository {

      abstract createLote(createLoteDto : CreateLoteDto): Promise<LoteEntity>;
      abstract getLoteById(id: string): Promise<LoteEntity | null>;
      abstract updateLote(id: string, updateLoteDto:UpdateLoteDto): Promise<LoteEntity>;
      abstract deleteLote(id: string): Promise<LoteEntity>;
      abstract getLotes(): Promise<LoteEntity[]>;
      abstract createLoteFromMuestra(id: string,peso:number): Promise<LoteEntity>;
    
}