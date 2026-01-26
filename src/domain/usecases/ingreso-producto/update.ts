import { UpdateIngresoProductoDto } from "../../dtos/ingreso-producto/update";
import { IngresoProductoEntity } from "../../entities/ingreso-producto.entity";
import { IngresoProductoRepository } from "../../repository/ingreso-producto.repository";


export class UpdateIngresoProducto {
  constructor(private readonly repo: IngresoProductoRepository) {}

  execute(id_ingreso: string, dto: UpdateIngresoProductoDto): Promise<IngresoProductoEntity> {
    if (!id_ingreso) throw new Error('id_ingreso es requerido');
    return this.repo.updateIngreso(id_ingreso, dto);
  }
}
