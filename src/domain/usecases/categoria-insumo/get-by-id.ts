import { CategoriaInsumoEntity } from '../../entities/categoria-insumo.entity';
import { CategoriaInsumoRepository } from '../../repository/categoria-insumo.repository';

export class GetCategoriaInsumoById {
  constructor(private readonly repo: CategoriaInsumoRepository) {}

  execute(id_categoria: string): Promise<CategoriaInsumoEntity | null> {
    if (!id_categoria) throw new Error('id_categoria es requerido');
    return this.repo.getById(id_categoria);
  }
}