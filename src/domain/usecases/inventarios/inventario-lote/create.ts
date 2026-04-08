import { CreateInventarioLoteDto } from "../../../dtos/inventarios/inventario-lote/create";
import { InventarioLoteEntity } from "../../../entities/inventario-lote.entity";
import { InventarioLoteRepository } from "../../../repository/inventario-lote.repository";

export class CreateInventarioLote {

  constructor(
    private readonly inventarioRepository: InventarioLoteRepository
  ) {}

  execute(dto: CreateInventarioLoteDto): Promise<InventarioLoteEntity> {
    return this.inventarioRepository.createInventario(dto);
  }
}
