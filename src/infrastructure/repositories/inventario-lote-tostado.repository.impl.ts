import { InventarioLoteTostadoDataSource } from "../../domain/datasources/inventario-lote-tostado.datasource";
import { CreateInventarioLoteTostadoDto } from "../../domain/dtos/inventarios/inventario-lote-tostado/create";
import { UpdateInventarioLoteTostadoDto } from "../../domain/dtos/inventarios/inventario-lote-tostado/update";
import { InventarioLoteTostadoEntity } from "../../domain/entities/inventario-lote-tostado.entity";
import { InventarioLoteTostadoRepository } from "../../domain/repository/inventario-lote-tostado.repository";

export class InventarioLoteTostadoRepositoryImpl
  implements InventarioLoteTostadoRepository {

  constructor(
    private readonly inventarioDatasource: InventarioLoteTostadoDataSource
  ) {}

  createInventario(
    dto: CreateInventarioLoteTostadoDto
  ): Promise<InventarioLoteTostadoEntity> {
    return this.inventarioDatasource.createInventario(dto);
  }

  updateInventario(
    id_inventario: string,
    dto: UpdateInventarioLoteTostadoDto
  ): Promise<InventarioLoteTostadoEntity> {
    return this.inventarioDatasource.updateInventario(id_inventario, dto);
  }

  getByLoteTostadoAndAlmacen(
    id_lote_tostado: string,
    id_almacen: string
  ): Promise<InventarioLoteTostadoEntity | null> {
    return this.inventarioDatasource.getByLoteTostadoAndAlmacen(
      id_lote_tostado,
      id_almacen
    );
  }

  getByAlmacen(
    id_almacen: string
  ): Promise<InventarioLoteTostadoEntity[]> {
    return this.inventarioDatasource.getByAlmacen(id_almacen);
  }
}
