import { InventarioInsumoEntity } from "../../../entities/inventario-insumo.entity";
import { InventarioInsumoRepository } from "../../../repository/inventario-insumo.repository";

export class GetInventarioInsumoByInsumo {
  constructor(private readonly repo: InventarioInsumoRepository) {}
  execute(id_insumo: string, id_almacen: string): Promise<InventarioInsumoEntity | null> {
    if (!id_insumo) throw new Error('id_insumo es requerido');
    if (!id_almacen) throw new Error('id_almacen es requerido');
    return this.repo.getByInsumoAndAlmacen(id_insumo, id_almacen);
  }
}
