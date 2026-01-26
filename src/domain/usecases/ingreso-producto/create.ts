import { CreateIngresoProductoDto } from "../../dtos/ingreso-producto/create";
import { IngresoProductoEntity } from "../../entities/ingreso-producto.entity";
import { IngresoProductoRepository } from "../../repository/ingreso-producto.repository";


export class CreateIngresoProducto {
  constructor(private readonly repo: IngresoProductoRepository) {}

  execute(dto: CreateIngresoProductoDto): Promise<IngresoProductoEntity> {
    return this.repo.createIngreso(dto);
  }
}
