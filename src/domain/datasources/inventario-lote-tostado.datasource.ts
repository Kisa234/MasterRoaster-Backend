import { CreateInventarioLoteTostadoDto } from '../dtos/inventarios/inventario-lote-tostado/create';
import { UpdateInventarioLoteTostadoDto } from '../dtos/inventarios/inventario-lote-tostado/update';
import { InventarioLoteTostadoEntity } from '../entities/inventario-lote-tostado.entity';

export abstract class InventarioLoteTostadoDataSource {

  abstract createInventario(
    dto: CreateInventarioLoteTostadoDto
  ): Promise<InventarioLoteTostadoEntity>;

  abstract updateInventario(
    id_inventario: string,
    dto: UpdateInventarioLoteTostadoDto
  ): Promise<InventarioLoteTostadoEntity>;

  abstract getByLoteTostadoAndAlmacen(
    id_lote_tostado: string,
    id_almacen: string
  ): Promise<InventarioLoteTostadoEntity | null>;

  abstract getByAlmacen(
    id_almacen: string
  ): Promise<InventarioLoteTostadoEntity[]>;
}
