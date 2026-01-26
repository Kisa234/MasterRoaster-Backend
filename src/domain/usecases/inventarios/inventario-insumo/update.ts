import { UpdateInventarioInsumoDto } from "../../../dtos/inventarios/inventario-insumo/update";
import { InventarioInsumoEntity } from "../../../entities/inventario-insumo.entity";
import { InventarioInsumoRepository } from "../../../repository/inventario-insumo.repository";

export class UpdateInventarioInsumo {
  constructor(private readonly repo: InventarioInsumoRepository) {}
  execute(id_inventario: string, dto: UpdateInventarioInsumoDto): Promise<InventarioInsumoEntity> {
    if (!id_inventario) throw new Error('id_inventario es requerido');
    return this.repo.updateInventario(id_inventario, dto);
  }
}
