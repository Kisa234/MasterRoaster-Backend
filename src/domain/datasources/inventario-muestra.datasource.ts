import { CreateInventarioMuestraDto } from '../dtos/inventarios/inventario-muestra/create';
import { UpdateInventarioMuestraDto } from '../dtos/inventarios/inventario-muestra/update';
import { InventarioMuestraEntity } from '../entities/inventario-muestra.entity';

export abstract class InventarioMuestraDataSource {

  abstract createInventario(
    dto: CreateInventarioMuestraDto
  ): Promise<InventarioMuestraEntity>;

  abstract updateInventario(
    id_inventario: string,
    dto: UpdateInventarioMuestraDto
  ): Promise<InventarioMuestraEntity>;

  abstract getByMuestraAndAlmacen(
    id_muestra: string,
    id_almacen: string
  ): Promise<InventarioMuestraEntity | null>;

  abstract getByAlmacen(
    id_almacen: string
  ): Promise<InventarioMuestraEntity[]>;
}
