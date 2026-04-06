import { HistorialAccion } from "../../../enums/historial-accion.enum";
import { HistorialEntidad } from "../../../enums/historial-entidad.enum";

const ACCION_VALUES = Object.values(HistorialAccion);
const ENTIDAD_VALUES = Object.values(HistorialEntidad);

export class CreateHistorialDto {

  private constructor(
    public readonly entidad: HistorialEntidad,
    public readonly id_entidad: string,
    public readonly id_user: string,
    public readonly accion: HistorialAccion,
    public readonly comentario?: string,
    public readonly objeto_antes?: any | null,
    public readonly objeto_despues?: any | null,
    public readonly id_pedido?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateHistorialDto?] {

    let {
      entidad,
      id_entidad,
      id_user,
      accion,
      comentario,
      objeto_antes,
      objeto_despues,
      id_pedido,
    } = props;

    // entidad
    if (!entidad) return ['entidad es requerida', undefined];
    const entidadValue = String(entidad).toUpperCase() as HistorialEntidad;
    if (!ENTIDAD_VALUES.includes(entidadValue)) {
      return [`entidad inválida. Valores permitidos: ${ENTIDAD_VALUES.join(', ')}`, undefined];
    }

    // id_entidad
    if (!id_entidad || !String(id_entidad).trim()) {
      return ['id_entidad es requerido', undefined];
    }

    // id_user
    if (!id_user || !String(id_user).trim()) {
      return ['id_user es requerido', undefined];
    }

    // accion
    if (!accion) return ['accion es requerida', undefined];
    const accionValue = String(accion).toUpperCase() as HistorialAccion;
    if (!ACCION_VALUES.includes(accionValue)) {
      return [`accion inválida. Valores permitidos: ${ACCION_VALUES.join(', ')}`, undefined];
    }

    // comentario
    if (comentario !== undefined && comentario !== null && typeof comentario !== 'string') {
      return ['comentario debe ser texto', undefined];
    }

    return [undefined, new CreateHistorialDto(
      entidadValue,
      String(id_entidad).trim(),
      String(id_user).trim(),
      accionValue,
      comentario?.trim() || undefined,
      objeto_antes ?? null,
      objeto_despues ?? null,
      id_pedido,
    )];
  }
}