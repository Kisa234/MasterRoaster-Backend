import { InsumoEntity } from "../../entities/insumo.entity";
import { InsumoRepository } from "../../repository/insumo.repository";

export class GetAllInsumos {

  constructor(
    private readonly insumoRepository: InsumoRepository
  ) {}

  execute(): Promise<InsumoEntity[]> {
    return this.insumoRepository.getAllInsumos();
  }
}
