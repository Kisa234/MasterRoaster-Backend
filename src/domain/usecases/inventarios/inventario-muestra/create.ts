import { CreateInventarioMuestraDto } from "../../../dtos/inventarios/inventario-muestra/create";
import { InventarioMuestraEntity } from "../../../entities/inventario-muestra.entity";
import { InventarioMuestraRepository } from "../../../repository/inventario-muestra.repository";

export class CreateInventarioMuestra {

  constructor(
    private readonly inventarioRepository: InventarioMuestraRepository
  ) {}

  execute(dto: CreateInventarioMuestraDto): Promise<InventarioMuestraEntity> {
    return this.inventarioRepository.createInventario(dto);
  }
}
