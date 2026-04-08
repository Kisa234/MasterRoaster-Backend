import { MovimientoAlmacenDataSource } from "../../domain/datasources/movimiento-almacen.datasource";
import { CreateMovimientoAlmacenDto } from "../../domain/dtos/almacen/movimiento-almacen/create";
import { UpdateMovimientoAlmacenDto } from "../../domain/dtos/almacen/movimiento-almacen/update";
import { MovimientoAlmacenEntity } from "../../domain/entities/movimiento-almacen.entity";
import { MovimientoAlmacenRepository } from "../../domain/repository/movimiento-almacen.repository";
import { EntidadInventario } from "../../enums/entidad-inventario.enum";
import { TipoMovimiento } from "../../enums/tipo-movimiento.enum";

export class MovimientoAlmacenRepositoryImpl implements MovimientoAlmacenRepository {

  constructor(
    private readonly movimientoDatasource: MovimientoAlmacenDataSource
  ) {}

  createMovimiento(dto: CreateMovimientoAlmacenDto): Promise<MovimientoAlmacenEntity> {
    return this.movimientoDatasource.createMovimiento(dto);
  }

  getMovimientoById(id_movimiento: string): Promise<MovimientoAlmacenEntity | null> {
    return this.movimientoDatasource.getMovimientoById(id_movimiento);
  }

  updateMovimiento(
    id_movimiento: string,
    dto: UpdateMovimientoAlmacenDto
  ): Promise<MovimientoAlmacenEntity> {
    return this.movimientoDatasource.updateMovimiento(id_movimiento, dto);
  }

  getAllMovimientos(from?: Date, to?: Date): Promise<MovimientoAlmacenEntity[]> {
    return this.movimientoDatasource.getAllMovimientos(from, to);
  }

  getMovimientosByEntidad(
    entidad: EntidadInventario,
    id_entidad: string,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]> {
    return this.movimientoDatasource.getMovimientosByEntidad(entidad, id_entidad, from, to);
  }

  getMovimientosByAlmacen(
    id_almacen: string,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]> {
    return this.movimientoDatasource.getMovimientosByAlmacen(id_almacen, from, to);
  }

  getMovimientosByTipo(
    tipo: TipoMovimiento,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]> {
    return this.movimientoDatasource.getMovimientosByTipo(tipo, from, to);
  }

  getMovimientosByFechaRange(from: Date, to: Date): Promise<MovimientoAlmacenEntity[]> {
    return this.movimientoDatasource.getMovimientosByFechaRange(from, to);
  }
}
