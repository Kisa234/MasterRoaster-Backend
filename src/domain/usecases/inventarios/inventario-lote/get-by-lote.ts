import { InventarioLoteEntity } from "../../../entities/inventario-lote.entity";
import { InventarioLoteRepository } from "../../../repository/inventario-lote.repository";

export class GetInventarioLoteByLote {

  constructor(
    private readonly inventarioRepository: InventarioLoteRepository
  ) {}

  execute(
    id_lote: string,
    id_almacen: string
  ): Promise<InventarioLoteEntity | null> {

    if (!id_lote) throw new Error('id_lote es requerido');
    if (!id_almacen) throw new Error('id_almacen es requerido');

    return this.inventarioRepository.getByLoteAndAlmacen(id_lote, id_almacen);
  }
}
