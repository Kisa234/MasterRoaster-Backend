import { AlmacenEntity } from "../../../entities/almacen.entity";
import { AlmacenRepository } from "../../../repository/almacen.repository";

export class GetAlmacenesActivos {

  constructor(
    private readonly almacenRepository: AlmacenRepository
  ) {}

  execute(): Promise<AlmacenEntity[]> {
    return this.almacenRepository.getAlmacenesActivos();
  }
}
