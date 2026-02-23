import { CategoriaInsumoEntity } from '../../entities/categoria-insumo.entity';
import { CategoriaInsumoRepository } from '../../repository/categoria-insumo.repository';

export class DeleteCategoriaInsumo {
  constructor(private readonly repo: CategoriaInsumoRepository) {}

  execute(id_categoria: string): Promise<CategoriaInsumoEntity> {
    if (!id_categoria) throw new Error('id_categoria es requerido');
    return this.repo.delete(id_categoria);
  }
}