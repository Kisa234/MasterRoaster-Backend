import { AlmacenDataSource } from "../../domain/datasources/almacen.datasource";
import { CreateAlmacenDto } from "../../domain/dtos/almacen/almacen/create";
import { UpdateAlmacenDto } from "../../domain/dtos/almacen/almacen/update";
import { AlmacenEntity } from "../../domain/entities/almacen.entity";
import { AlmacenRepository } from "../../domain/repository/almacen.repository";

export class AlmacenRepositoryImpl implements AlmacenRepository {

  constructor(
    private readonly almacenDatasource: AlmacenDataSource
  ) {}

  createAlmacen(dto: CreateAlmacenDto): Promise<AlmacenEntity> {
    return this.almacenDatasource.createAlmacen(dto);
  }

  getAlmacenById(id_almacen: string): Promise<AlmacenEntity | null> {
    return this.almacenDatasource.getAlmacenById(id_almacen);
  }

  updateAlmacen(
    id_almacen: string,
    dto: UpdateAlmacenDto
  ): Promise<AlmacenEntity> {
    return this.almacenDatasource.updateAlmacen(id_almacen, dto);
  }

  deleteAlmacen(id_almacen: string): Promise<AlmacenEntity> {
    return this.almacenDatasource.deleteAlmacen(id_almacen);
  }

  getAllAlmacenes(activo?: boolean): Promise<AlmacenEntity[]> {
    return this.almacenDatasource.getAllAlmacenes(activo);
  }
}
