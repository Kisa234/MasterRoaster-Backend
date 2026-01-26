import { IngresoProductoEntity } from "../../entities/ingreso-producto.entity";
import { IngresoProductoRepository } from "../../repository/ingreso-producto.repository";


export class GetIngresoProductoByAlmacen {
  constructor(private readonly repo: IngresoProductoRepository) {}

  execute(id_almacen: string): Promise<IngresoProductoEntity[]> {
    if (!id_almacen) throw new Error('id_almacen es requerido');
    return this.repo.getByAlmacen(id_almacen);
  }
}
