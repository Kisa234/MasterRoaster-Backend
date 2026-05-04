import { BalonGasDatasource } from '../../domain/datasources/balon-gas.datasource';
import { CreateBalonGasDto } from '../../domain/dtos/balon-gas/create-balon-gas';
import { FinalizeBalonGasDto } from '../../domain/dtos/balon-gas/finalize-balon-gas';
import { StartBalonGasDto } from '../../domain/dtos/balon-gas/start-balon-gas';
import { BalonGasEntity } from '../../domain/entities/balon-gas.entity';
import { BalonGasRepository } from '../../domain/repository/balon-gas.repository';


export class BalonGasRepositoryImpl implements BalonGasRepository {
  constructor(
    private readonly datasource: BalonGasDatasource,
  ) {}

  create(dto: CreateBalonGasDto): Promise<BalonGasEntity> {
    return this.datasource.create(dto);
  }

  start(dto: StartBalonGasDto): Promise<BalonGasEntity> {
    return this.datasource.start(dto);
  }

  finalize(dto: FinalizeBalonGasDto): Promise<BalonGasEntity> {
    return this.datasource.finalize(dto);
  }

  getAll(): Promise<BalonGasEntity[]> {
    return this.datasource.getAll();
  }

  getById(id_balon_gas: string): Promise<BalonGasEntity> {
    return this.datasource.getById(id_balon_gas);
  }

  getActual(): Promise<BalonGasEntity | null> {
    return this.datasource.getActual();
  }


}