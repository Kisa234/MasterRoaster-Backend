import { Molienda } from "@prisma/client";

export class TrasladarStockAlmacenDto {
  private constructor(
    public readonly entidad: "LOTE" | "LOTE_TOSTADO" | "PRODUCTO" | "MUESTRA" | "INSUMO",
    public readonly id_entidad: string,
    public readonly id_almacen_origen: string,
    public readonly id_almacen_destino: string,
    public readonly cantidad: number,
    public readonly id_user: string,
    public readonly motivo?: string,
    public readonly gramaje?: number | null,
    public readonly molienda?: Molienda | null,
  ) {}

  static create(object: { [key: string]: any }): [string?, TrasladarStockAlmacenDto?] {
    const {
      entidad,
      id_entidad,
      id_almacen_origen,
      id_almacen_destino,
      cantidad,
      id_user,
      motivo,
      gramaje,
      molienda,
    } = object;

    if (!entidad) return ["La entidad es requerida"];
    if (!id_entidad) return ["El id_entidad es requerido"];
    if (!id_almacen_origen) return ["El id_almacen_origen es requerido"];
    if (!id_almacen_destino) return ["El id_almacen_destino es requerido"];
    if (!id_user) return ["El id_user es requerido"];
    if (id_almacen_origen === id_almacen_destino) {
      return ["El almacén origen y destino no pueden ser iguales"];
    }

    const cantidadNumber = Number(cantidad);
    if (cantidad === undefined || cantidad === null) return ["La cantidad es requerida"];
    if (isNaN(cantidadNumber)) return ["La cantidad debe ser numérica"];
    if (cantidadNumber <= 0) return ["La cantidad debe ser mayor a 0"];

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
      new TrasladarStockAlmacenDto(
        entidad,
        id_entidad,
        id_almacen_origen,
        id_almacen_destino,
        cantidadNumber,
        id_user,
        motivo,
        gramajeNumber,
        molienda ?? null
      ),
    ];
  }
}