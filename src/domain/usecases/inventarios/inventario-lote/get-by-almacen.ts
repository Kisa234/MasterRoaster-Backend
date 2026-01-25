import { InventarioLoteEntity } from "../../../entities/inventario-lote.entity";
import { InventarioLoteRepository } from "../../../repository/inventario-lote.repository";

export class GetInventarioLoteByAlmacen {

  constructor(
    private readonly inventarioRepository: InventarioLoteRepository
  ) {}

  execute(id_almacen: string): Promise<InventarioLoteEntity[]> {
    if (!id_almacen) throw new Error('id_almacen es requerido');
    return this.inventarioRepository.getByAlmacen(id_almacen);
  }
}
