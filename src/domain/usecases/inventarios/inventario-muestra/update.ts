import { UpdateInventarioMuestraDto } from "../../../dtos/inventarios/inventario-muestra/update";
import { InventarioMuestraEntity } from "../../../entities/inventario-muestra.entity";
import { InventarioMuestraRepository } from "../../../repository/inventario-muestra.repository";

export class UpdateInventarioMuestra {

  constructor(
    private readonly inventarioRepository: InventarioMuestraRepository
  ) {}

  execute(
    id_inventario: string,
    dto: UpdateInventarioMuestraDto
  ): Promise<InventarioMuestraEntity> {

    if (!id_inventario) throw new Error('id_inventario es requerido');
    return this.inventarioRepository.updateInventario(id_inventario, dto);
  }
}
