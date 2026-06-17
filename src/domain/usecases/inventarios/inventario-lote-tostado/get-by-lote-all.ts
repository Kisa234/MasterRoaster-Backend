import { InventarioLoteTostadoEntity } from "../../../entities/inventario-lote-tostado.entity";
import { InventarioLoteTostadoRepository } from "../../../repository/inventario-lote-tostado.repository";

export class GetAllInventarioLoteTostadoByLoteTostado {

  constructor(
    private readonly inventarioRepository: InventarioLoteTostadoRepository
  ) {}

  execute(id_lote_tostado: string): Promise<InventarioLoteTostadoEntity[]> {
    if (!id_lote_tostado) throw new Error('id_lote_tostado es requerido');
    return this.inventarioRepository.getByLote(id_lote_tostado);
  }
}