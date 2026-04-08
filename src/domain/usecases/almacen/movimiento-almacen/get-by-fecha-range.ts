import { MovimientoAlmacenEntity } from "../../../entities/movimiento-almacen.entity";
import { MovimientoAlmacenRepository } from "../../../repository/movimiento-almacen.repository";

export class GetMovimientosByFechaRange {

  constructor(
    private readonly movimientoRepository: MovimientoAlmacenRepository
  ) {}

  execute(from: Date, to: Date): Promise<MovimientoAlmacenEntity[]> {

    if (!from || !to) {
      throw new Error('from y to son requeridos');
    }

    return this.movimientoRepository.getMovimientosByFechaRange(from, to);
  }
}
