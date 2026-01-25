import { prisma } from "../../data/postgres";
import { MovimientoAlmacenDataSource } from "../../domain/datasources/movimiento-almacen.datasource";
import { CreateMovimientoAlmacenDto } from "../../domain/dtos/almacen/movimiento-almacen/create";
import { UpdateMovimientoAlmacenDto } from "../../domain/dtos/almacen/movimiento-almacen/update";
import { MovimientoAlmacenEntity } from "../../domain/entities/movimiento-almacen.entity";
import { EntidadInventario } from "../../enums/entidad-inventario.enum";
import { TipoMovimiento } from "../../enums/tipo-movimiento.enum";

export class MovimientoAlmacenDataSourceImpl implements MovimientoAlmacenDataSource {

  async createMovimiento(
    dto: CreateMovimientoAlmacenDto
  ): Promise<MovimientoAlmacenEntity> {

    const movimiento = await prisma.movimientoAlmacen.create({
      data: {
        tipo: dto.tipo,
        entidad: dto.entidad,
        id_entidad: dto.id_entidad,
        cantidad: dto.cantidad,
        id_almacen_origen: dto.id_almacen_origen,
        id_almacen_destino: dto.id_almacen_destino,
        id_user: dto.id_user!,
        comentario: dto.comentario,
      },
    });

    return MovimientoAlmacenEntity.fromObject(movimiento);
  }

  async getMovimientoById(
    id_movimiento: string
  ): Promise<MovimientoAlmacenEntity | null> {

    const movimiento = await prisma.movimientoAlmacen.findFirst({
      where: { id_movimiento },
    });

    if (!movimiento) return null;
    return MovimientoAlmacenEntity.fromObject(movimiento);
  }

  async updateMovimiento(
    id_movimiento: string,
    dto: UpdateMovimientoAlmacenDto
  ): Promise<MovimientoAlmacenEntity> {

    const movimiento = await prisma.movimientoAlmacen.update({
      where: { id_movimiento },
      data: dto.values,
    });

    return MovimientoAlmacenEntity.fromObject(movimiento);
  }

  async getAllMovimientos(
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]> {

    const movimientos = await prisma.movimientoAlmacen.findMany({
      where: {
        ...(from && to ? { fecha: { gte: from, lt: to } } : {}),
      },
      orderBy: { fecha: 'desc' },
    });

    return movimientos.map(MovimientoAlmacenEntity.fromObject);
  }

  async getMovimientosByEntidad(
    entidad: EntidadInventario,
    id_entidad: string,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]> {

    const movimientos = await prisma.movimientoAlmacen.findMany({
      where: {
        entidad,
        id_entidad,
        ...(from && to ? { fecha: { gte: from, lt: to } } : {}),
      },
      orderBy: { fecha: 'desc' },
    });

    return movimientos.map(MovimientoAlmacenEntity.fromObject);
  }

  async getMovimientosByAlmacen(
    id_almacen: string,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]> {

    const movimientos = await prisma.movimientoAlmacen.findMany({
      where: {
        OR: [
          { id_almacen_origen: id_almacen },
          { id_almacen_destino: id_almacen },
        ],
        ...(from && to ? { fecha: { gte: from, lt: to } } : {}),
      },
      orderBy: { fecha: 'desc' },
    });

    return movimientos.map(MovimientoAlmacenEntity.fromObject);
  }

  async getMovimientosByTipo(
    tipo: TipoMovimiento,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]> {

    const movimientos = await prisma.movimientoAlmacen.findMany({
      where: {
        tipo,
        ...(from && to ? { fecha: { gte: from, lt: to } } : {}),
      },
      orderBy: { fecha: 'desc' },
    });

    return movimientos.map(MovimientoAlmacenEntity.fromObject);
  }

  async getMovimientosByFechaRange(
    from: Date,
    to: Date
  ): Promise<MovimientoAlmacenEntity[]> {

    const movimientos = await prisma.movimientoAlmacen.findMany({
      where: {
        fecha: { gte: from, lt: to },
      },
      orderBy: { fecha: 'desc' },
    });

    return movimientos.map(MovimientoAlmacenEntity.fromObject);
  }
}
