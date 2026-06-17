import { InventarioLoteEntity } from "../../../entities/inventario-lote.entity";
import { InventarioLoteRepository } from "../../../repository/inventario-lote.repository";

export class GetAllInventarioLoteByLote {

  constructor(
    private readonly inventarioRepository: InventarioLoteRepository
  ) {}

  execute(id_lote: string): Promise<InventarioLoteEntity[]> {
    if (!id_lote) throw new Error('id_lote es requerido');
    return this.inventarioRepository.getByLote(id_lote);
  }
}