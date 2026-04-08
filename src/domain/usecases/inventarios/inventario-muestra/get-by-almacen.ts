import { InventarioMuestraEntity } from "../../../entities/inventario-muestra.entity";
import { InventarioMuestraRepository } from "../../../repository/inventario-muestra.repository";

export class GetInventarioMuestraByAlmacen {

  constructor(
    private readonly inventarioRepository: InventarioMuestraRepository
  ) {}

  execute(id_almacen: string): Promise<InventarioMuestraEntity[]> {
    if (!id_almacen) throw new Error('id_almacen es requerido');
    return this.inventarioRepository.getByAlmacen(id_almacen);
  }
}
