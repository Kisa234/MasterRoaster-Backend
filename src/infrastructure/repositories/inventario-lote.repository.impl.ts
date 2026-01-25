import { InventarioLoteDataSource } from "../../domain/datasources/inventario-lote.datasource";
import { CreateInventarioLoteDto } from "../../domain/dtos/inventarios/inventario-lote/create";
import { UpdateInventarioLoteDto } from "../../domain/dtos/inventarios/inventario-lote/update";
import { InventarioLoteEntity } from "../../domain/entities/inventario-lote.entity";
import { InventarioLoteRepository } from "../../domain/repository/inventario-lote.repository";

export class InventarioLoteRepositoryImpl implements InventarioLoteRepository {

  constructor(
    private readonly inventarioDatasource: InventarioLoteDataSource
  ) {}

  createInventario(dto: CreateInventarioLoteDto): Promise<InventarioLoteEntity> {
    return this.inventarioDatasource.createInventario(dto);
  }

  updateInventario(
    id_inventario: string,
    dto: UpdateInventarioLoteDto
  ): Promise<InventarioLoteEntity> {
    return this.inventarioDatasource.updateInventario(id_inventario, dto);
  }

  getByLoteAndAlmacen(
    id_lote: string,
    id_almacen: string
  ): Promise<InventarioLoteEntity | null> {
    return this.inventarioDatasource.getByLoteAndAlmacen(id_lote, id_almacen);
  }

  getByAlmacen(id_almacen: string): Promise<InventarioLoteEntity[]> {
    return this.inventarioDatasource.getByAlmacen(id_almacen);
  }
}
