import { AlmacenDataSource } from "../../domain/datasources/almacen.datasource";
import { CreateAlmacenDto } from "../../domain/dtos/almacen/almacen/create";
import { UpdateAlmacenDto } from "../../domain/dtos/almacen/almacen/update";
import { AlmacenEntity } from "../../domain/entities/almacen.entity";
import { AlmacenRepository } from "../../domain/repository/almacen.repository";

export class AlmacenRepositoryImpl implements AlmacenRepository {

  constructor(
    private readonly almacen: AlmacenDataSource
  ) {}

  createAlmacen(createAlmacenDto: CreateAlmacenDto): Promise<AlmacenEntity> {
    return this.almacen.createAlmacen(createAlmacenDto);
  }

  getAlmacenById(id_almacen: string): Promise<AlmacenEntity | null> {
    return this.almacen.getAlmacenById(id_almacen);
  }

  updateAlmacen(id_almacen: string, updateAlmacenDto: UpdateAlmacenDto): Promise<AlmacenEntity> {
    return this.almacen.updateAlmacen(id_almacen, updateAlmacenDto);
  }

  deleteAlmacen(id_almacen: string): Promise<AlmacenEntity> {
    return this.almacen.deleteAlmacen(id_almacen);
  }

  getAllAlmacenes(): Promise<AlmacenEntity[]> {
    return this.almacen.getAllAlmacenes();
  }

  getAlmacenesActivos(): Promise<AlmacenEntity[]> {
    return this.almacen.getAlmacenesActivos();
  }
}
