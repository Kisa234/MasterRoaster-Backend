import { EstadisticasBalonGas } from '../../entities/balon-gas.entity';
import { BalonGasRepository } from '../../repository/balon-gas.repository';

export interface GetEstadisticasBalonGasUseCase {
  execute(): Promise<EstadisticasBalonGas>;
}

export class GetEstadisticasBalonGas implements GetEstadisticasBalonGasUseCase {
  constructor(
    private readonly repository: BalonGasRepository,
  ) {}

  async execute(): Promise<EstadisticasBalonGas> {
    return this.repository.getEstadisticas();
  }
}