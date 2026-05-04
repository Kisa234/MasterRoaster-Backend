import { BalonGasEntity } from '../../entities/balon-gas.entity';
import { BalonGasRepository } from '../../repository/balon-gas.repository';

export interface GetBalonesGasUseCase {
  execute(): Promise<BalonGasEntity[]>;
}

export class GetBalonesGas implements GetBalonesGasUseCase {
  constructor(
    private readonly repository: BalonGasRepository,
  ) {}

  execute(): Promise<BalonGasEntity[]> {
    return this.repository.getAll();
  }
}