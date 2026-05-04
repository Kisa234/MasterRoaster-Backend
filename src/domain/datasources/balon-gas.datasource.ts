import { CreateBalonGasDto } from '../dtos/balon-gas/create-balon-gas';
import { FinalizeBalonGasDto } from '../dtos/balon-gas/finalize-balon-gas';
import { StartBalonGasDto } from '../dtos/balon-gas/start-balon-gas';
import { BalonGasEntity } from '../entities/balon-gas.entity';

export abstract class BalonGasDatasource {
  abstract create(dto: CreateBalonGasDto): Promise<BalonGasEntity>;

  abstract start(dto: StartBalonGasDto): Promise<BalonGasEntity>;

  abstract finalize(dto: FinalizeBalonGasDto): Promise<BalonGasEntity>;

  abstract getAll(): Promise<BalonGasEntity[]>;

  abstract getById(id_balon_gas: string): Promise<BalonGasEntity>;

  abstract getActual(): Promise<BalonGasEntity | null>;
}