import { AlmacenEntity } from "../../../entities/almacen.entity";
import { AlmacenRepository } from "../../../repository/almacen.repository";

export class GetAlmacenById {

  constructor(
    private readonly almacenRepository: AlmacenRepository
  ) {}

  execute(id_almacen: string): Promise<AlmacenEntity | null> {
    if (!id_almacen) throw new Error('id_almacen es requerido');
    return this.almacenRepository.getAlmacenById(id_almacen);
  }
}
