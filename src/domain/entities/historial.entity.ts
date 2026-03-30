import { HistorialAccion } from "../../enums/historial-accion.enum";
import { HistorialEntidad } from "../../enums/historial-entidad.enum";

export class HistorialEntity {
  constructor(
    public id_historial: string,
    public entidad: HistorialEntidad,
    public id_entidad: string,
    public id_user: string,
    public id_pedido: string,
    public accion: HistorialAccion,
    public fecha_registro: Date,
    public comentario?: string,
    public objeto_antes?: unknown | null,
    public objeto_despues?: unknown | null
  ) {}

  static fromObject(obj: { [key: string]: any }): HistorialEntity {
    const {
      id_historial,
      entidad,
      id_entidad,
      id_user,
      id_pedido,
      accion,
      comentario,
      fecha_registro,
      objeto_antes,
      objeto_despues
    } = obj;

    if (!id_historial || !String(id_historial).trim()) {
      throw new Error("id_historial property is required");
    }

    if (!entidad || !String(entidad).trim()) {
      throw new Error("entidad property is required");
    }

    if (!id_entidad || !String(id_entidad).trim()) {
      throw new Error("id_entidad property is required");
    }

    if (!id_user || !String(id_user).trim()) {
      throw new Error("id_user property is required");
    }

    if (!accion || !String(accion).trim()) {
      throw new Error("accion property is required");
    }

    const entidadValue = String(entidad).toUpperCase() as HistorialEntidad;
    if (!Object.values(HistorialEntidad).includes(entidadValue)) {
      throw new Error(
        `entidad must be one of: ${Object.values(HistorialEntidad).join(", ")}`
      );
    }

    const accionValue = String(accion).toUpperCase() as HistorialAccion;
    if (!Object.values(HistorialAccion).includes(accionValue)) {
      throw new Error(
        `accion must be one of: ${Object.values(HistorialAccion).join(", ")}`
      );
    }

    const newFechaRegistro = new Date(fecha_registro);
    if (isNaN(newFechaRegistro.getTime())) {
      throw new Error("fecha_registro no es válida");
    }

    if (comentario !== undefined && comentario !== null && typeof comentario !== "string") {
      throw new Error("comentario must be a string");
    }

    return new HistorialEntity(
      String(id_historial).trim(),
      entidadValue,
      String(id_entidad).trim(),
      String(id_user).trim(),
      id_pedido,
      accionValue,
      newFechaRegistro,
      comentario?.trim() || undefined,
      objeto_antes ?? null,
      objeto_despues ?? null
    );
  }
}