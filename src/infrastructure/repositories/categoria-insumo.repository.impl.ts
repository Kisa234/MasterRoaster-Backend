import { CategoriaInsumoRepository } from '../../domain/repository/categoria-insumo.repository';
import { CategoriaInsumoEntity } from '../../domain/entities/categoria-insumo.entity';
import { CategoriaInsumoDatasource } from '../../domain/datasources/categoria-insumo.datasource';
import { CreateCategoriaInsumoDto } from '../../domain/dtos/categoria-insumo/create';
import { UpdateCategoriaInsumoDto } from '../../domain/dtos/categoria-insumo/update';

export class CategoriaInsumoRepositoryImpl implements CategoriaInsumoRepository {
  constructor(private readonly ds: CategoriaInsumoDatasource) {}

  create(dto: CreateCategoriaInsumoDto): Promise<CategoriaInsumoEntity> {
    return this.ds.create(dto);
  }

  getAll(): Promise<CategoriaInsumoEntity[]> {
    return this.ds.getAll();
  }

  getById(id_categoria: string): Promise<CategoriaInsumoEntity | null> {
    return this.ds.getById(id_categoria);
  }

  update(id_categoria: string, dto: UpdateCategoriaInsumoDto): Promise<CategoriaInsumoEntity> {
    return this.ds.update(id_categoria, dto);
  }

  delete(id_categoria: string): Promise<CategoriaInsumoEntity> {
    return this.ds.delete(id_categoria);
  }
}