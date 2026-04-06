import { InsumoConInventariosEntity, InsumoEntity } from "../../entities/insumo.entity";
import { InsumoRepository } from "../../repository/insumo.repository";

export interface GetInsumoConInventariosByIdUseCase {
  execute(id_insumo: string): Promise<InsumoConInventariosEntity | null>;
}

export class GetInsumoConInventariosById implements GetInsumoConInventariosByIdUseCase {
  constructor(
    private readonly insumoRepository: InsumoRepository,
  ) {}

  async execute(id_insumo: string): Promise<InsumoConInventariosEntity | null> {
    return await this.insumoRepository.getInsumoConInventariosById(id_insumo);
  }
}