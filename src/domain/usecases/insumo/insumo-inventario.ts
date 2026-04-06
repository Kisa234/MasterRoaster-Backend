import { InsumoConInventariosEntity, InsumoEntity } from "../../entities/insumo.entity";
import { InsumoRepository } from "../../repository/insumo.repository";

export interface GetInsumosConInventariosUseCase {
  execute(): Promise<InsumoConInventariosEntity[]>;
}

export class GetInsumosConInventarios implements GetInsumosConInventariosUseCase {
  constructor(
    private readonly insumoRepository: InsumoRepository,
  ) {}

  async execute(): Promise<InsumoConInventariosEntity[]> {
    return await this.insumoRepository.getInsumosConInventarios();
  }
}