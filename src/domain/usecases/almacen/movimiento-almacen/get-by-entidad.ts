import { EntidadInventario } from "../../../../enums/entidad-inventario.enum";
import { MovimientoAlmacenEntity } from "../../../entities/movimiento-almacen.entity";
import { MovimientoAlmacenRepository } from "../../../repository/movimiento-almacen.repository";

export class GetMovimientosByEntidad {

  constructor(
    private readonly movimientoRepository: MovimientoAlmacenRepository
  ) {}

  execute(
    entidad: EntidadInventario,
    id_entidad: string,
    from?: Date,
    to?: Date
  ): Promise<MovimientoAlmacenEntity[]> {

    if (!entidad) throw new Error('entidad es requerida');
    if (!id_entidad) throw new Error('id_entidad es requerido');

    return this.movimientoRepository.getMovimientosByEntidad(
      entidad,
      id_entidad,
      from,
      to
    );
  }
}
