import { BalonGasEntity } from '../../entities/balon-gas.entity';
import { BalonGasRepository } from '../../repository/balon-gas.repository';

export interface GetBalonGasActualUseCase {
  execute(): Promise<BalonGasEntity | null>;
}

export class GetBalonGasActual implements GetBalonGasActualUseCase {
  constructor(
    private readonly repository: BalonGasRepository,
  ) {}

  execute(): Promise<BalonGasEntity | null> {
    return this.repository.getActual();
  }
}