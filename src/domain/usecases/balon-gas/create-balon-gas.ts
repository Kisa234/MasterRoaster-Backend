import { CreateBalonGasDto } from '../../dtos/balon-gas/create-balon-gas';
import { BalonGasEntity } from '../../entities/balon-gas.entity';
import { BalonGasRepository } from '../../repository/balon-gas.repository';

export interface CreateBalonGasUseCase {
  execute(dto: CreateBalonGasDto): Promise<BalonGasEntity>;
}

export class CreateBalonGas implements CreateBalonGasUseCase {
  constructor(
    private readonly repository: BalonGasRepository,
  ) {}

  execute(dto: CreateBalonGasDto): Promise<BalonGasEntity> {
    return this.repository.create(dto);
  }
}