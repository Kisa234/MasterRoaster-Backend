import { Molienda } from "@prisma/client";

export class AjustarStockAlmacenDto {
  private constructor(
    public readonly entidad: "LOTE" | "LOTE_TOSTADO" | "PRODUCTO" | "MUESTRA" | "INSUMO",
    public readonly id_entidad: string,
    public readonly id_almacen: string,
    public readonly nueva_cantidad: number,
    public readonly id_user: string,
    public readonly motivo?: string,
    public readonly gramaje?: number | null,
    public readonly molienda?: Molienda | null,
  ) {}

  static create(object: { [key: string]: any }): [string?, AjustarStockAlmacenDto?] {
    const {
      entidad,
      id_entidad,
      id_almacen,
      nueva_cantidad,
      id_user,
      motivo,
      gramaje,
      molienda,
    } = object;

    if (!entidad) return ["La entidad es requerida"];
    if (!id_entidad) return ["El id_entidad es requerido"];
    if (!id_almacen) return ["El id_almacen es requerido"];
    if (nueva_cantidad === undefined || nueva_cantidad === null) {
      return ["La nueva_cantidad es requerida"];
    }
    if (!id_user) return ["El id_user es requerido"];

    const cantidad = Number(nueva_cantidad);
    if (isNaN(cantidad)) return ["La nueva_cantidad debe ser numérica"];
    if (cantidad < 0) return ["La nueva_cantidad no puede ser negativa"];

    const gramajeNumber =
      gramaje !== undefined && gramaje !== null && gramaje !== ""
        ? Number(gramaje)
        : null;

    if (
      gramaje !== undefined &&
      gramaje !== null &&
      gramaje !== "" &&
      isNaN(gramajeNumber!)
    ) {
      return ["El gramaje debe ser numérico"];
    }

    return [
      undefined,
      new AjustarStockAlmacenDto(
        entidad,
        id_entidad,
        id_almacen,
        cantidad,
        id_user,
        motivo,
        gramajeNumber,
        molienda ?? null
      ),
    ];
  }
}