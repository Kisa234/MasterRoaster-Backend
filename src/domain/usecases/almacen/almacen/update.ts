import { UpdateAlmacenDto } from "../../../dtos/almacen/almacen/update";
import { AlmacenEntity } from "../../../entities/almacen.entity";
import { AlmacenRepository } from "../../../repository/almacen.repository";

export class UpdateAlmacen {

  constructor(
    private readonly almacenRepository: AlmacenRepository
  ) {}

  execute(
    id_almacen: string,
    updateAlmacenDto: UpdateAlmacenDto
  ): Promise<AlmacenEntity> {

    if (!id_almacen) throw new Error('id_almacen es requerido');
    if (!updateAlmacenDto) throw new Error('updateAlmacenDto es requerido');

    return this.almacenRepository.updateAlmacen(id_almacen, updateAlmacenDto);
  }
}
