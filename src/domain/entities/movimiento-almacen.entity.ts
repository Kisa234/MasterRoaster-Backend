import { EntidadInventario } from "../../enums/entidad-inventario.enum";
import { TipoMovimiento } from "../../enums/tipo-movimiento.enum";

export class MovimientoAlmacenEntity {

  constructor(
    public id_movimiento: string,
    public tipo: TipoMovimiento,
    public entidad: EntidadInventario,
    public id_entidad: string,
    public cantidad: number,
    public id_user: string,
    public fecha: Date,
    public id_almacen_origen?: string,
    public id_almacen_destino?: string,
    public comentario?: string,
  ) {}

  static fromObject(obj: { [key: string]: any }): MovimientoAlmacenEntity {

    const {
      id_movimiento,
      tipo,
      entidad,
      id_entidad,
      id_almacen_origen,
      id_almacen_destino,
      cantidad,
      comentario,
      id_user,
      fecha,
    } = obj;

    if (!id_movimiento) throw new Error('id_movimiento property is required');
    if (!tipo) throw new Error('tipo property is required');
    if (!entidad) throw new Error('entidad property is required');
    if (!id_entidad) throw new Error('id_entidad property is required');
    if (cantidad === undefined || cantidad === null) throw new Error('cantidad property is required');
    if (!id_user) throw new Error('id_user property is required');
    if (!fecha) throw new Error('fecha property is required');

    if (!Object.values(TipoMovimiento).includes(tipo)) {
      throw new Error(`tipo must be one of: ${Object.values(TipoMovimiento).join(', ')}`);
    }

    if (!Object.values(EntidadInventario).includes(entidad)) {
      throw new Error(`entidad must be one of: ${Object.values(EntidadInventario).join(', ')}`);
    }

    if (typeof cantidad !== 'number' || isNaN(cantidad) || cantidad <= 0) {
      throw new Error('cantidad must be a positive number');
    }

    const newFecha = new Date(fecha);
    if (isNaN(newFecha.getTime())) {
      throw new Error('fecha is not a valid date');
    }

    return new MovimientoAlmacenEntity(
      id_movimiento,
      tipo,
      entidad,
      id_entidad,
      cantidad,
      id_user,
      newFecha,
      id_almacen_origen ?? undefined,
      id_almacen_destino ?? undefined,
      comentario ?? undefined
    );
  }
}
