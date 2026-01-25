import { InventarioMuestraDataSource } from "../../domain/datasources/inventario-muestra.datasource";
import { CreateInventarioMuestraDto } from "../../domain/dtos/inventarios/inventario-muestra/create";
import { UpdateInventarioMuestraDto } from "../../domain/dtos/inventarios/inventario-muestra/update";
import { InventarioMuestraEntity } from "../../domain/entities/inventario-muestra.entity";
import { InventarioMuestraRepository } from "../../domain/repository/inventario-muestra.repository";

export class InventarioMuestraRepositoryImpl
  implements InventarioMuestraRepository {

  constructor(
    private readonly inventarioDatasource: InventarioMuestraDataSource
  ) {}

  createInventario(
    dto: CreateInventarioMuestraDto
  ): Promise<InventarioMuestraEntity> {
    return this.inventarioDatasource.createInventario(dto);
  }

  updateInventario(
    id_inventario: string,
    dto: UpdateInventarioMuestraDto
  ): Promise<InventarioMuestraEntity> {
    return this.inventarioDatasource.updateInventario(id_inventario, dto);
  }

  getByMuestraAndAlmacen(
    id_muestra: string,
    id_almacen: string
  ): Promise<InventarioMuestraEntity | null> {
    return this.inventarioDatasource.getByMuestraAndAlmacen(
      id_muestra,
      id_almacen
    );
  }

  getByAlmacen(
    id_almacen: string
  ): Promise<InventarioMuestraEntity[]> {
    return this.inventarioDatasource.getByAlmacen(id_almacen);
  }
}
