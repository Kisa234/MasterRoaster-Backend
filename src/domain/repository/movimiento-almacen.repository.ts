import { MovimientoAlmacenEntity } from '../entities/movimiento-almacen.entity';
import { EntidadInventario } from '../../enums/entidad-inventario.enum';
import { CreateMovimientoAlmacenDto } from '../dtos/almacen/movimiento-almacen/create';
import { UpdateMovimientoAlmacenDto } from '../dtos/almacen/movimiento-almacen/update';
import { TipoMovimiento } from '../../enums/tipo-movimiento.enum';

export abstract class MovimientoAlmacenRepository {

  abstract createMovimiento(
    dto: CreateMovimientoAlmacenDto
  ): Promise<MovimientoAlmacenEntity>;  

  abstract getMovimientoById(
    id_movimiento: string
  ): Promise<MovimientoAlmacenEntity | null>;

  abstract updateMovimiento(
    id_movimiento: string,
    dto: UpdateMovimientoAlmacenDto
  ): Promise<MovimientoAlmacenEntity>;

  abstract getAllMovimientos(
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]>;

  abstract getMovimientosByEntidad(
    entidad: EntidadInventario,
    id_entidad: string,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]>;

  abstract getMovimientosByAlmacen(
    id_almacen: string,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]>;

  abstract getMovimientosByTipo(
    tipo: TipoMovimiento,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]>;

  abstract getMovimientosByFechaRange(
    from: Date,
    to: Date
  ): Promise<MovimientoAlmacenEntity[]>;
}
