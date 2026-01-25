import { UpdateInventarioLoteDto } from "../../../dtos/inventarios/inventario-lote/update";
import { InventarioLoteEntity } from "../../../entities/inventario-lote.entity";
import { InventarioLoteRepository } from "../../../repository/inventario-lote.repository";

export class UpdateInventarioLote {

  constructor(
    private readonly inventarioRepository: InventarioLoteRepository
  ) {}

  execute(
    id_inventario: string,
    dto: UpdateInventarioLoteDto
  ): Promise<InventarioLoteEntity> {

    if (!id_inventario) throw new Error('id_inventario es requerido');
    return this.inventarioRepository.updateInventario(id_inventario, dto);
  }
}
