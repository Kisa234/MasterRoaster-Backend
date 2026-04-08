import { CreateAlmacenDto } from "../../../dtos/almacen/almacen/create";
import { AlmacenEntity } from "../../../entities/almacen.entity";
import { AlmacenRepository } from "../../../repository/almacen.repository";

export class CreateAlmacen {

  constructor(
    private readonly almacenRepository: AlmacenRepository
  ) {}

  execute(createAlmacenDto: CreateAlmacenDto): Promise<AlmacenEntity> {
    return this.almacenRepository.createAlmacen(createAlmacenDto);
  }
}
