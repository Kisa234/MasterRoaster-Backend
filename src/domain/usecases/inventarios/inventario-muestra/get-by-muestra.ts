import { InventarioMuestraEntity } from "../../../entities/inventario-muestra.entity";
import { InventarioMuestraRepository } from "../../../repository/inventario-muestra.repository";

export class GetInventarioMuestraByMuestra {

  constructor(
    private readonly inventarioRepository: InventarioMuestraRepository
  ) {}

  execute(
    id_muestra: string,
    id_almacen: string
  ): Promise<InventarioMuestraEntity | null> {

    if (!id_muestra) throw new Error('id_muestra es requerido');
    if (!id_almacen) throw new Error('id_almacen es requerido');

    return this.inventarioRepository.getByMuestraAndAlmacen(
      id_muestra,
      id_almacen
    );
  }
}
