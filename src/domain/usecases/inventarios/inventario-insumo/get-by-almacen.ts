import { InventarioInsumoEntity } from "../../../entities/inventario-insumo.entity";
import { InventarioInsumoRepository } from "../../../repository/inventario-insumo.repository";

export class GetInventarioInsumoByAlmacen {
  constructor(private readonly repo: InventarioInsumoRepository) {}
  execute(id_almacen: string): Promise<InventarioInsumoEntity[]> {
    if (!id_almacen) throw new Error('id_almacen es requerido');
    return this.repo.getByAlmacen(id_almacen);
  }
}
