import { CreateMarcaDto } from '../dtos/marca/create';
import { UpdateMarcaDto } from '../dtos/marca/update';
import { MarcaEntity } from '../entities/marca.entity';

export abstract class MarcaRepository {
  abstract create(dto: CreateMarcaDto): Promise<MarcaEntity>;
  abstract getAll(): Promise<MarcaEntity[]>;
  abstract getById(id_marca: string): Promise<MarcaEntity | null>;
  abstract update(id_marca: string, dto: UpdateMarcaDto): Promise<MarcaEntity>;
  abstract delete(id_marca: string): Promise<MarcaEntity>;
}