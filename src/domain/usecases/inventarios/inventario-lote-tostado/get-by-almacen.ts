import { InventarioLoteTostadoEntity } from "../../../entities/inventario-lote-tostado.entity";
import { InventarioLoteTostadoRepository } from "../../../repository/inventario-lote-tostado.repository";

export class GetInventarioLoteTostadoByAlmacen {

  constructor(
    private readonly inventarioRepository: InventarioLoteTostadoRepository
  ) {}

  execute(id_almacen: string): Promise<InventarioLoteTostadoEntity[]> {
    if (!id_almacen) throw new Error('id_almacen es requerido');
    return this.inventarioRepository.getByAlmacen(id_almacen);
  }
}
