import { EntidadInventario } from "../../../../enums/entidad-inventario.enum";
import { TipoMovimiento } from "../../../../enums/tipo-movimiento.enum";

const TIPO_VALUES = Object.values(TipoMovimiento);
const ENTIDAD_VALUES = Object.values(EntidadInventario);

export class CreateMovimientoAlmacenDto {

  private constructor(
    public readonly tipo: TipoMovimiento,
    public readonly entidad: EntidadInventario,
    public readonly id_entidad_primario: string,
    public readonly id_pedido:string| null,
    public readonly cantidad: number,
    public readonly id_user: string,
    public readonly id_entidad_secundario?:string,
    public readonly id_almacen_origen?: string,
    public readonly id_almacen_destino?: string,
    public readonly comentario?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateMovimientoAlmacenDto?] {

    let {
      tipo,
      entidad,
      id_entidad_primario,
      id_pedido,
      cantidad,
      id_user,
      id_almacen_origen,
      id_almacen_destino,
      comentario,
      id_entidad_secundario
    } = props;

    // tipo
    if (!tipo) return ['tipo es requerido', undefined];
    const tipoValue = String(tipo).toUpperCase() as TipoMovimiento;
    if (!TIPO_VALUES.includes(tipoValue)) {
      return [`tipo inválido. Valores permitidos: ${TIPO_VALUES.join(', ')}`, undefined];
    }

    // entidad
    if (!entidad) return ['entidad es requerida', undefined];
    const entidadValue = String(entidad).toUpperCase() as EntidadInventario;
    if (!ENTIDAD_VALUES.includes(entidadValue)) {
      return [`entidad inválida. Valores permitidos: ${ENTIDAD_VALUES.join(', ')}`, undefined];
    }

    // id_entidad
    if (!id_entidad_primario || !String(id_entidad_primario).trim()) {
      return ['id_entidad es requerido', undefined];
    }

    // cantidad
    if (cantidad === undefined || cantidad === null) {
      return ['cantidad es requerida', undefined];
    }

    const nCantidad = typeof cantidad === 'string' ? Number(cantidad) : cantidad;
    if (typeof nCantidad !== 'number' || isNaN(nCantidad) || nCantidad <= 0) {
      return ['cantidad debe ser un número positivo', undefined];
    }

    // id_user (AHORA OBLIGATORIO 🔥)
    if (!id_user || !String(id_user).trim()) {
      return ['id_user es requerido', undefined];
    }

    // normalización
    const o = id_almacen_origen ? String(id_almacen_origen).trim() : undefined;
    const d = id_almacen_destino ? String(id_almacen_destino).trim() : undefined;

    // reglas por tipo
    if (tipoValue === TipoMovimiento.INGRESO && !d) {
      return ['id_almacen_destino es requerido para INGRESO', undefined];
    }

    if (tipoValue === TipoMovimiento.SALIDA && !o) {
      return ['id_almacen_origen es requerido para SALIDA', undefined];
    }

    if (tipoValue === TipoMovimiento.TRASLADO) {
      if (!o) return ['id_almacen_origen es requerido para TRASLADO', undefined];
      if (!d) return ['id_almacen_destino es requerido para TRASLADO', undefined];
      if (o === d) return ['En TRASLADO, origen y destino no pueden ser el mismo', undefined];
    }

    if (tipoValue === TipoMovimiento.AJUSTE && !o) {
      return ['id_almacen_origen es requerido para AJUSTE', undefined];
    }

    // comentario
    if (comentario !== undefined && comentario !== null && typeof comentario !== 'string') {
      return ['comentario debe ser texto', undefined];
    }

    return [undefined, new CreateMovimientoAlmacenDto(
      tipoValue,
      entidadValue,
      String(id_entidad_primario).trim(),
      id_pedido,
      nCantidad,
      String(id_user).trim(),
      id_entidad_secundario,
      o,
      d,
      comentario?.trim() || undefined,
    )];
  }
}