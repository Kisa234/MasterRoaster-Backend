import { AlmacenEntity } from "../../../entities/almacen.entity";
import { AlmacenRepository } from "../../../repository/almacen.repository";

export class GetAllAlmacenes {

  constructor(
    private readonly almacenRepository: AlmacenRepository
  ) {}

  execute(): Promise<AlmacenEntity[]> {
    return this.almacenRepository.getAllAlmacenes();
  }
}
