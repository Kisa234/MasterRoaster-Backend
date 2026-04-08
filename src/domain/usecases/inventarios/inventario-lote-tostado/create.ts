import { CreateInventarioLoteTostadoDto } from "../../../dtos/inventarios/inventario-lote-tostado/create";
import { InventarioLoteTostadoEntity } from "../../../entities/inventario-lote-tostado.entity";
import { InventarioLoteTostadoRepository } from "../../../repository/inventario-lote-tostado.repository";

export class CreateInventarioLoteTostado {

  constructor(
    private readonly inventarioRepository: InventarioLoteTostadoRepository
  ) {}

  execute(dto: CreateInventarioLoteTostadoDto): Promise<InventarioLoteTostadoEntity> {
    return this.inventarioRepository.createInventario(dto);
  }
}
