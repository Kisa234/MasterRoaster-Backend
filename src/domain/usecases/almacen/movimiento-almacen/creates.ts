import { CreateMovimientoAlmacenDto } from "../../../dtos/almacen/movimiento-almacen/create";
import { MovimientoAlmacenEntity } from "../../../entities/movimiento-almacen.entity";
import { MovimientoAlmacenRepository } from "../../../repository/movimiento-almacen.repository";

export interface CreateMovimientoAlmacenUseCase {
  execute(dto: CreateMovimientoAlmacenDto): Promise<MovimientoAlmacenEntity>;
}

export class CreateMovimientoAlmacen implements CreateMovimientoAlmacenUseCase {

  constructor(
    private readonly movimientoRepository: MovimientoAlmacenRepository
  ) {}

  async execute(dto: CreateMovimientoAlmacenDto): Promise<MovimientoAlmacenEntity> {
    // reglas de stock se aplicarán en Inventarios
    return this.movimientoRepository.createMovimiento(dto);
  }
}
