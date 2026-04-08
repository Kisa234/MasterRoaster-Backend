import { UpdateInventarioLoteTostadoDto } from "../../../dtos/inventarios/inventario-lote-tostado/update";
import { InventarioLoteTostadoEntity } from "../../../entities/inventario-lote-tostado.entity";
import { InventarioLoteTostadoRepository } from "../../../repository/inventario-lote-tostado.repository";

export class UpdateInventarioLoteTostado {

  constructor(
    private readonly inventarioRepository: InventarioLoteTostadoRepository
  ) {}

  execute(
    id_inventario: string,
    dto: UpdateInventarioLoteTostadoDto
  ): Promise<InventarioLoteTostadoEntity> {

    if (!id_inventario) throw new Error('id_inventario es requerido');
    return this.inventarioRepository.updateInventario(id_inventario, dto);
  }
}
