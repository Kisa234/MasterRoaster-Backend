import { CreateLoteDto } from "../dtos/lotes/lote/create";
import { CreateLoteRapidoDto } from "../dtos/lotes/lote/create-rapido";
import { UpdateLoteDto } from "../dtos/lotes/lote/update";
import { LoteEntity } from "../entities/lote.entity";
import { PedidoEntity } from "../entities/pedido.entity";

export abstract class LoteRepository {
  abstract createLote(createLoteDto: CreateLoteDto): Promise<LoteEntity>;
  abstract createLoteRapido(dto: CreateLoteRapidoDto): Promise<LoteEntity>;
  abstract getLoteById(id: string): Promise<LoteEntity | null>;
  abstract updateLote(id: string, updateLoteDto: UpdateLoteDto): Promise<LoteEntity>;
  abstract deleteLote(id: string): Promise<LoteEntity>;
  abstract getLotes(): Promise<LoteEntity[]>;
  abstract createLoteFromMuestra(id: string, peso: number, dto: CreateLoteDto): Promise<LoteEntity>;
  abstract getLotesByUserId(id: string): Promise<LoteEntity[]>;
  abstract getLotesTostados(): Promise<LoteEntity[]>;
  abstract getLotesVerdes(): Promise<LoteEntity[]>;
  abstract getUserByLote(id: string): Promise<string>;
}