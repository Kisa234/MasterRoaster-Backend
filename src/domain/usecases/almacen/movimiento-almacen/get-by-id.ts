import { MovimientoAlmacenEntity } from "../../../entities/movimiento-almacen.entity";
import { MovimientoAlmacenRepository } from "../../../repository/movimiento-almacen.repository";

export class GetMovimientoAlmacenById {

  constructor(
    private readonly movimientoRepository: MovimientoAlmacenRepository
  ) {}

  execute(id_movimiento: string): Promise<MovimientoAlmacenEntity | null> {

    if (!id_movimiento) {
      throw new Error('id_movimiento es requerido');
    }

    return this.movimientoRepository.getMovimientoById(id_movimiento);
  }
}
