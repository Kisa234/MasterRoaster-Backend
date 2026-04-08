import { InsumoEntity } from "../../entities/insumo.entity";
import { InsumoRepository } from "../../repository/insumo.repository";

export class GetInsumoById {

  constructor(
    private readonly insumoRepository: InsumoRepository
  ) {}

  execute(id_insumo: string): Promise<InsumoEntity | null> {
    if (!id_insumo) throw new Error('id_insumo es requerido');
    return this.insumoRepository.getInsumoById(id_insumo);
  }
}
