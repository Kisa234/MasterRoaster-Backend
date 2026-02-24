import { MarcaRepository } from '../../domain/repository/marca.repository';
import { MarcaDatasource } from '../../domain/datasources/marca.datasource';
import { MarcaEntity } from '../../domain/entities/marca.entity';
import { CreateMarcaDto } from '../../domain/dtos/marca/create';
import { UpdateMarcaDto } from '../../domain/dtos/marca/update';

export class MarcaRepositoryImpl implements MarcaRepository {
  constructor(private readonly datasource: MarcaDatasource) {}

  create(dto: CreateMarcaDto): Promise<MarcaEntity> {
    return this.datasource.create(dto);
  }

  getAll(): Promise<MarcaEntity[]> {
    return this.datasource.getAll();
  }

  getById(id_marca: string): Promise<MarcaEntity | null> {
    return this.datasource.getById(id_marca);
  }

  update(id_marca: string, dto: UpdateMarcaDto): Promise<MarcaEntity> {
    return this.datasource.update(id_marca, dto);
  }

  delete(id_marca: string): Promise<MarcaEntity> {
    return this.datasource.delete(id_marca);
  }
}