import { IngresoProductoEntity } from "../../entities/ingreso-producto.entity";
import { IngresoProductoRepository } from "../../repository/ingreso-producto.repository";

export class GetIngresoProductoByProducto {
  constructor(private readonly repo: IngresoProductoRepository) {}

  execute(id_producto: string): Promise<IngresoProductoEntity[]> {
    if (!id_producto) throw new Error('id_producto es requerido');
    return this.repo.getByProducto(id_producto);
  }
}
