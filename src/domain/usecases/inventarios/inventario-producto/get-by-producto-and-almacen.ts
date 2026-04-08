import { Molienda } from "@prisma/client";
import { InventarioProductoEntity } from "../../../entities/inventario-producto.entity";
import { InventarioProductoRepository } from "../../../repository/inventario-producto.repository";

export interface GetInventarioProductoByProductoAndAlmacenUseCase {
  execute(
    id_producto: string,
    id_almacen: string,
    gramaje?: number | null,
    molienda?: Molienda | null
  ): Promise<InventarioProductoEntity | null>;
}

export class GetInventarioProductoByProductoAndAlmacen
  implements GetInventarioProductoByProductoAndAlmacenUseCase {
  constructor(
    private readonly inventarioProductoRepository: InventarioProductoRepository
  ) {}

  async execute(
    id_producto: string,
    id_almacen: string,
    gramaje?: number | null,
    molienda?: Molienda | null
  ): Promise<InventarioProductoEntity | null> {
    if (!id_producto) throw new Error("El id_producto es requerido");
    if (!id_almacen) throw new Error("El id_almacen es requerido");

    return this.inventarioProductoRepository.getByProductoAndAlmacen(
      id_producto,
      id_almacen,
      gramaje ?? null,
      molienda ?? null
    );
  }
}