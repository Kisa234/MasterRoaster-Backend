import { CategoriaInsumoEntity } from '../../entities/categoria-insumo.entity';
import { CategoriaInsumoRepository } from '../../repository/categoria-insumo.repository';

export class GetAllCategoriaInsumo {
  constructor(private readonly repo: CategoriaInsumoRepository) {}

  execute(): Promise<CategoriaInsumoEntity[]> {
    return this.repo.getAll();
  }
}