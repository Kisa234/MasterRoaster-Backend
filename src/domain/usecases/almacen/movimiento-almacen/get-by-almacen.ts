import { MovimientoAlmacenEntity } from "../../../entities/movimiento-almacen.entity";
import { MovimientoAlmacenRepository } from "../../../repository/movimiento-almacen.repository";

export class GetMovimientosByAlmacen {

  constructor(
    private readonly movimientoRepository: MovimientoAlmacenRepository
  ) {}

  execute(
    id_almacen: string,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]> {

    if (!id_almacen) {
      throw new Error('id_almacen es requerido');
    }

    return this.movimientoRepository.getMovimientosByAlmacen(
      id_almacen,
      from,
      to
    );
  }
}
