import { LoteTostadoConInventarioEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

interface GetLotesTostadosConInventarioUseCase {
  execute(): Promise<LoteTostadoConInventarioEntity[]>;
}

export class GetLotesTostadosConInventario implements GetLotesTostadosConInventarioUseCase {

  constructor(
    private readonly repository: LoteTostadoRepository
  ) {}

  async execute(): Promise<LoteTostadoConInventarioEntity[]> {
    return await this.repository.getLotesTostadosConInventario();
  }
}