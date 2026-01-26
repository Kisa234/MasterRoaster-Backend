import { CreateIngresoProductoDto } from '../dtos/ingreso-producto/create';
import { UpdateIngresoProductoDto } from '../dtos/ingreso-producto/update';
import { IngresoProductoEntity } from '../entities/ingreso-producto.entity';

export abstract class IngresoProductoRepository {
  abstract createIngreso(dto: CreateIngresoProductoDto): Promise<IngresoProductoEntity>;
  abstract updateIngreso(id_ingreso: string, dto: UpdateIngresoProductoDto): Promise<IngresoProductoEntity>;
  abstract getByProducto(id_producto: string): Promise<IngresoProductoEntity[]>;
  abstract getByAlmacen(id_almacen: string): Promise<IngresoProductoEntity[]>;
}
