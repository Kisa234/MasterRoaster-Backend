import { AlmacenEntity } from "../../../entities/almacen.entity";
import { AlmacenRepository } from "../../../repository/almacen.repository";

export class DeleteAlmacen {

  constructor(
    private readonly almacenRepository: AlmacenRepository
  ) {}

  execute(id_almacen: string): Promise<AlmacenEntity> {
    if (!id_almacen) throw new Error('id_almacen es requerido');
    return this.almacenRepository.deleteAlmacen(id_almacen);
  }
}
