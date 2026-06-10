import { CreateBalonGasHistoricoDto } from '../../dtos/balon-gas/create-balon-gas-historico';
import { BalonGasEntity } from '../../entities/balon-gas.entity';
import { BalonGasRepository } from '../../repository/balon-gas.repository';

export interface CreateBalonGasHistoricoUseCase {
  execute(dto: CreateBalonGasHistoricoDto): Promise<BalonGasEntity>;
}

export class CreateBalonGasHistorico implements CreateBalonGasHistoricoUseCase {
  constructor(
    private readonly repository: BalonGasRepository,
  ) {}

  async execute(dto: CreateBalonGasHistoricoDto): Promise<BalonGasEntity> {
    return this.repository.createHistorico(dto);
  }
}