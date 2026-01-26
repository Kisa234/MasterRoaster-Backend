import { InventarioInsumoDataSource } from "../../domain/datasources/inventario-insumo.datasource";
import { CreateInventarioInsumoDto } from "../../domain/dtos/inventarios/inventario-insumo/create";
import { UpdateInventarioInsumoDto } from "../../domain/dtos/inventarios/inventario-insumo/update";
import { InventarioInsumoEntity } from "../../domain/entities/inventario-insumo.entity";
import { InventarioInsumoRepository } from "../../domain/repository/inventario-insumo.repository";

export class InventarioInsumoRepositoryImpl
  implements InventarioInsumoRepository {

  constructor(
    private readonly datasource: InventarioInsumoDataSource
  ) {}

  createInventario(
    dto: CreateInventarioInsumoDto
  ): Promise<InventarioInsumoEntity> {
    return this.datasource.createInventario(dto);
  }

  updateInventario(
    id_inventario: string,
    dto: UpdateInventarioInsumoDto
  ): Promise<InventarioInsumoEntity> {
    return this.datasource.updateInventario(id_inventario, dto);
  }

  getByInsumoAndAlmacen(
    id_insumo: string,
    id_almacen: string
  ): Promise<InventarioInsumoEntity | null> {
    return this.datasource.getByInsumoAndAlmacen(id_insumo, id_almacen);
  }

  getByAlmacen(
    id_almacen: string
  ): Promise<InventarioInsumoEntity[]> {
    return this.datasource.getByAlmacen(id_almacen);
  }
}
