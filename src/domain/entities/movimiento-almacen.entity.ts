import { EntidadInventario } from "../../enums/entidad-inventario.enum";
import { TipoMovimiento } from "../../enums/tipo-movimiento.enum";

export class MovimientoAlmacenEntity {
  constructor(
    public id_movimiento: string,
    public tipo: TipoMovimiento,
    public entidad: EntidadInventario,
    public id_entidad_primario: string,
    public id_pedido:string,
    public cantidad: number,
    public id_user: string,
    public fecha: Date,
    public id_entidad_secundario? :string,
    public id_almacen_origen?: string,
    public id_almacen_destino?: string,
    public comentario?: string,
  ) {}

  static fromObject(obj: { [key: string]: any }): MovimientoAlmacenEntity {
    const {
      id_movimiento,
      tipo,
      entidad,
      id_entidad_primario,
      id_pedido,
      id_almacen_origen,
      id_almacen_destino,
      cantidad,
      comentario,
      id_user,
      fecha,
      id_entidad_secundario,
    } = obj;

    if (!id_movimiento || !String(id_movimiento).trim()) {
      throw new Error("id_movimiento property is required");
    }

    if (!tipo || !String(tipo).trim()) {
      throw new Error("tipo property is required");
    }

    if (!entidad || !String(entidad).trim()) {
      throw new Error("entidad property is required");
    }

    if (!id_entidad_primario || !String(id_entidad_primario).trim()) {
      throw new Error("id_entidad property is required");
    }

    if (cantidad === undefined || cantidad === null) {
      throw new Error("cantidad property is required");
    }

    if (!id_user || !String(id_user).trim()) {
      throw new Error("id_user property is required");
    }

    if (!fecha) {
      throw new Error("fecha property is required");
    }

    const tipoValue = String(tipo).toUpperCase() as TipoMovimiento;
    if (!Object.values(TipoMovimiento).includes(tipoValue)) {
      throw new Error(
        `tipo must be one of: ${Object.values(TipoMovimiento).join(", ")}`
      );
    }

    const entidadValue = String(entidad).toUpperCase() as EntidadInventario;
    if (!Object.values(EntidadInventario).includes(entidadValue)) {
      throw new Error(
        `entidad must be one of: ${Object.values(EntidadInventario).join(", ")}`
      );
    }

    const nCantidad = typeof cantidad === "string" ? Number(cantidad) : cantidad;
    if (typeof nCantidad !== "number" || isNaN(nCantidad) || nCantidad <= 0) {
      throw new Error("cantidad must be a positive number");
    }

    const newFecha = new Date(fecha);
    if (isNaN(newFecha.getTime())) {
      throw new Error("fecha is not a valid date");
    }

    const origen = id_almacen_origen ? String(id_almacen_origen).trim() : undefined;
    const destino = id_almacen_destino ? String(id_almacen_destino).trim() : undefined;

    if (tipoValue === TipoMovimiento.INGRESO && !destino) {
      throw new Error("id_almacen_destino is required for INGRESO");
    }

    if (tipoValue === TipoMovimiento.SALIDA && !origen) {
      throw new Error("id_almacen_origen is required for SALIDA");
    }

    if (tipoValue === TipoMovimiento.TRASLADO) {
      if (!origen) {
        throw new Error("id_almacen_origen is required for TRASLADO");
      }
      if (!destino) {
        throw new Error("id_almacen_destino is required for TRASLADO");
      }
      if (origen === destino) {
        throw new Error("origen and destino cannot be the same in TRASLADO");
      }
    }

    if (tipoValue === TipoMovimiento.AJUSTE && !origen) {
      throw new Error("id_almacen_origen is required for AJUSTE");
    }

    if (comentario !== undefined && comentario !== null && typeof comentario !== "string") {
      throw new Error("comentario must be a string");
    }

    return new MovimientoAlmacenEntity(
      String(id_movimiento).trim(),
      tipoValue,
      entidadValue,
      String(id_entidad_primario).trim(),
      id_pedido,
      nCantidad,
      String(id_user).trim(),
      newFecha,
      id_entidad_secundario,
      origen,
      destino,
      comentario?.trim() || undefined
    );
  }
}