import { InsumoEntity } from "../../entities/insumo.entity";
import { InsumoRepository } from "../../repository/insumo.repository";

export class GetInsumosActivos {

  constructor(
    private readonly insumoRepository: InsumoRepository
  ) {}

  execute(): Promise<InsumoEntity[]> {
    return this.insumoRepository.getInsumosActivos();
  }
}
