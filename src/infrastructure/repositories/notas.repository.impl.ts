import { CreateNotasDto } from "../../domain/dtos/notas/create";
import { UpdateNotasDto } from "../../domain/dtos/notas/update";
import { NotasEntity } from "../../domain/entities/notas.entity";
import { NotasRepository } from "../../domain/repository/notas.repository";
import { NotasDataSource } from '../../domain/datasources/notas.datasource';

export class NotasRepositoryImpl implements NotasRepository {

  constructor(
    private readonly notasDataSource: NotasDataSource
  ) {}

  createNotas(dto: CreateNotasDto): Promise<NotasEntity> {
    return this.notasDataSource.createNotas(dto);
  }

  getNotasById(id: string): Promise<NotasEntity | null> {
    return this.notasDataSource.getNotasById(id);
  }

  updateNotas(id: string, dto: UpdateNotasDto): Promise<NotasEntity> {
    return this.notasDataSource.updateNotas(id, dto);
  }

  deleteNotas(id: string): Promise<NotasEntity> {
    return this.notasDataSource.deleteNotas(id);
  }

  getAllNotas(): Promise<NotasEntity[]> {
    return this.notasDataSource.getAllNotas();
  }
}
