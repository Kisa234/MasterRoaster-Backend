import { CreateCategoriaInsumoDto } from '../../dtos/categoria-insumo/create';
import { CategoriaInsumoEntity } from '../../entities/categoria-insumo.entity';
import { CategoriaInsumoRepository } from '../../repository/categoria-insumo.repository';

export class CreateCategoriaInsumo {
  constructor(private readonly repo: CategoriaInsumoRepository) {}

  execute(dto: CreateCategoriaInsumoDto): Promise<CategoriaInsumoEntity> {
    if (!dto) throw new Error('dto es requerido');
    return this.repo.create(dto);
  }
}