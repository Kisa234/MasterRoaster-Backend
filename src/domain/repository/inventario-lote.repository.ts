import { CreateInventarioLoteDto } from '../dtos/inventarios/inventario-lote/create';
import { UpdateInventarioLoteDto } from '../dtos/inventarios/inventario-lote/update';
import { InventarioLoteEntity } from '../entities/inventario-lote.entity';

export abstract class InventarioLoteRepository {

  abstract createInventario(
    dto: CreateInventarioLoteDto
  ): Promise<InventarioLoteEntity>;

  abstract updateInventario(
    id_inventario: string,
    dto: UpdateInventarioLoteDto
  ): Promise<InventarioLoteEntity>;

  abstract getByLoteAndAlmacen(
    id_lote: string,
    id_almacen: string
  ): Promise<InventarioLoteEntity | null>;

  abstract getByAlmacen(
    id_almacen: string
  ): Promise<InventarioLoteEntity[]>;
}
