import { CreateInventarioInsumoDto } from "../../../dtos/inventarios/inventario-insumo/create";
import { InventarioInsumoEntity } from "../../../entities/inventario-insumo.entity";
import { InventarioInsumoRepository } from "../../../repository/inventario-insumo.repository";

export class CreateInventarioInsumo {
  constructor(private readonly repo: InventarioInsumoRepository) {}
  execute(dto: CreateInventarioInsumoDto): Promise<InventarioInsumoEntity> {
    return this.repo.createInventario(dto);
  }
}
