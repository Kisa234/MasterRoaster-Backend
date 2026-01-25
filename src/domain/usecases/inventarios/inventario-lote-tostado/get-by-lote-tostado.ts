import { InventarioLoteTostadoEntity } from "../../../entities/inventario-lote-tostado.entity";
import { InventarioLoteTostadoRepository } from "../../../repository/inventario-lote-tostado.repository";

export class GetInventarioLoteTostadoByLote {

  constructor(
    private readonly inventarioRepository: InventarioLoteTostadoRepository
  ) {}

  execute(
    id_lote_tostado: string,
    id_almacen: string
  ): Promise<InventarioLoteTostadoEntity | null> {

    if (!id_lote_tostado) throw new Error('id_lote_tostado es requerido');
    if (!id_almacen) throw new Error('id_almacen es requerido');

    return this.inventarioRepository.getByLoteTostadoAndAlmacen(
      id_lote_tostado,
      id_almacen
    );
  }
}
