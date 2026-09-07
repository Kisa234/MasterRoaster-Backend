import { CreateBolsaDto } from "../dtos/bolsa/create";
import { UpdateBolsaDto } from "../dtos/bolsa/update";
import { BolsaConInventarioEntity, BolsaEntity } from "../entities/bolsa.entity";

export abstract class BolsaRepository {
  abstract createBolsa(id_bolsa: string, createBolsaDto: CreateBolsaDto): Promise<BolsaEntity>;
  abstract getBolsaById(id: string): Promise<BolsaEntity | null>;
  abstract updateBolsa(id: string, updateBolsaDto: UpdateBolsaDto): Promise<BolsaEntity>;
  abstract deleteBolsa(id: string): Promise<BolsaEntity>;
  abstract getBolsas(): Promise<BolsaEntity[]>;
  abstract getBolsasByPedidoId(id_pedido: string): Promise<BolsaEntity[]>;
  abstract getBolsasByLoteTostadoId(id_lote_tostado: string): Promise<BolsaEntity[]>;
  abstract countBolsasByLoteTostadoId(id_lote_tostado: string): Promise<number>;
  abstract countBolsasByLoteTostadoGramajeMolienda(id_lote_tostado: string, gramaje: number, molienda: string): Promise<number>;
  abstract getBolsasConInventario(incluirEliminados: boolean): Promise<BolsaConInventarioEntity[]>;
  abstract getBolsaConInventarioById(id: string): Promise<BolsaConInventarioEntity | null>;
  abstract getBolsasOwnedByStore(incluirEliminados?: boolean): Promise<BolsaEntity[]>;
  abstract getBolsasByUserId(id_user: string, incluirEliminados?: boolean): Promise<BolsaEntity[]>;
}