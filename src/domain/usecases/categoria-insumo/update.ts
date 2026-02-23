import { UpdateCategoriaInsumoDto } from '../../dtos/categoria-insumo/update';
import { CategoriaInsumoEntity } from '../../entities/categoria-insumo.entity';
import { CategoriaInsumoRepository } from '../../repository/categoria-insumo.repository';

export class UpdateCategoriaInsumo {
  constructor(private readonly repo: CategoriaInsumoRepository) {}

  execute(id_categoria: string, dto: UpdateCategoriaInsumoDto): Promise<CategoriaInsumoEntity> {
    if (!id_categoria) throw new Error('id_categoria es requerido');
    if (!dto) throw new Error('dto es requerido');
    return this.repo.update(id_categoria, dto);
  }
}