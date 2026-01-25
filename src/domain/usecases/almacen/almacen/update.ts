import { UpdateAlmacenDto } from "../../../dtos/almacen/almacen/update";
import { AlmacenEntity } from "../../../entities/almacen.entity";
import { AlmacenRepository } from "../../../repository/almacen.repository";

export interface UpdateAlmacenUseCase {
  execute(id_almacen: string, dto: UpdateAlmacenDto): Promise<AlmacenEntity>;
}

export class UpdateAlmacen implements UpdateAlmacenUseCase {

  constructor(
    private readonly almacenRepository: AlmacenRepository
  ) {}

  async execute(
    id_almacen: string,
    dto: UpdateAlmacenDto
  ): Promise<AlmacenEntity> {

    if (!id_almacen) {
      throw new Error('id_almacen es requerido');
    }

    // validación mínima: que tenga algo que actualizar
    if (Object.keys(dto.values).length === 0) {
      throw new Error('No hay campos para actualizar');
    }

    return await this.almacenRepository.updateAlmacen(id_almacen, dto);
  }
}
