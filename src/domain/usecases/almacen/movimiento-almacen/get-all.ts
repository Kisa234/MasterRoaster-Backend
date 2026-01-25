import { MovimientoAlmacenEntity } from "../../../entities/movimiento-almacen.entity";
import { MovimientoAlmacenRepository } from "../../../repository/movimiento-almacen.repository";

export class GetAllMovimientos {

  constructor(
    private readonly movimientoRepository: MovimientoAlmacenRepository
  ) {}

  execute(from?: Date, to?: Date): Promise<MovimientoAlmacenEntity[]> {
    return this.movimientoRepository.getAllMovimientos(from, to);
  }
}
