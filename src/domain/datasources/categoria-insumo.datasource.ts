import { CreateCategoriaInsumoDto } from '../dtos/categoria-insumo/create';
import { UpdateCategoriaInsumoDto } from '../dtos/categoria-insumo/update';
import { CategoriaInsumoEntity } from '../entities/categoria-insumo.entity';

export abstract class CategoriaInsumoDatasource {
  abstract create(dto: CreateCategoriaInsumoDto): Promise<CategoriaInsumoEntity>;
  abstract getAll(): Promise<CategoriaInsumoEntity[]>;
  abstract getById(id_categoria: string): Promise<CategoriaInsumoEntity | null>;
  abstract update(id_categoria: string, dto: UpdateCategoriaInsumoDto): Promise<CategoriaInsumoEntity>;
  abstract delete(id_categoria: string): Promise<CategoriaInsumoEntity>;
}