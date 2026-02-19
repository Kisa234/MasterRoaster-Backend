import { UpdateInsumoDto } from "../../dtos/insumo/update";
import { InsumoEntity } from "../../entities/insumo.entity";
import { InsumoRepository } from "../../repository/insumo.repository";

export class UpdateInsumo {

  constructor(
    private readonly insumoRepository: InsumoRepository
  ) {}

  execute(
    id_insumo: string,
    updateInsumoDto: UpdateInsumoDto
  ): Promise<InsumoEntity> {

    if (!id_insumo) throw new Error('id_insumo es requerido');
    if (!updateInsumoDto) throw new Error('updateInsumoDto es requerido');

    return this.insumoRepository.updateInsumo(id_insumo, updateInsumoDto);
  }
}
