import { CreateInventarioInsumoDto } from '../dtos/inventarios/inventario-insumo/create';
import { UpdateInventarioInsumoDto } from '../dtos/inventarios/inventario-insumo/update';
import { InventarioInsumoEntity } from '../entities/inventario-insumo.entity';

export abstract class InventarioInsumoDataSource {
  abstract createInventario(dto: CreateInventarioInsumoDto): Promise<InventarioInsumoEntity>;
  abstract updateInventario(id_inventario: string, dto: UpdateInventarioInsumoDto): Promise<InventarioInsumoEntity>;
  abstract getByInsumoAndAlmacen(id_insumo: string, id_almacen: string): Promise<InventarioInsumoEntity | null>;
  abstract getByAlmacen(id_almacen: string): Promise<InventarioInsumoEntity[]>;
}
