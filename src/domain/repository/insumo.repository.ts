import { CreateInsumoDto } from "../dtos/insumo/create";
import { UpdateInsumoDto } from "../dtos/insumo/update";
import { InsumoConInventariosEntity, InsumoEntity } from "../entities/insumo.entity";

export abstract class InsumoRepository {
  abstract createInsumo(createInsumoDto: CreateInsumoDto): Promise<InsumoEntity>;
  abstract getInsumoById(id_insumo: string): Promise<InsumoEntity | null>;
  abstract updateInsumo(id_insumo: string, updateInsumoDto: UpdateInsumoDto): Promise<InsumoEntity>;
  abstract deleteInsumo(id_insumo: string): Promise<InsumoEntity>;
  abstract getAllInsumos(): Promise<InsumoEntity[]>;
  abstract getInsumosActivos(): Promise<InsumoEntity[]>;
  abstract getInsumosConInventarios(): Promise<InsumoConInventariosEntity[]>;
  abstract getInsumoConInventariosById(id_insumo: string): Promise<InsumoConInventariosEntity | null>;
}
