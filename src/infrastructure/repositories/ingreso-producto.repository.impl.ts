import { IngresoProductoDataSource } from "../../domain/datasources/ingreso-producto.datasource";
import { CreateIngresoProductoDto } from "../../domain/dtos/ingreso-producto/create";
import { UpdateIngresoProductoDto } from "../../domain/dtos/ingreso-producto/update";
import { IngresoProductoEntity } from "../../domain/entities/ingreso-producto.entity";
import { IngresoProductoRepository } from "../../domain/repository/ingreso-producto.repository";

export class IngresoProductoRepositoryImpl
  implements IngresoProductoRepository {

  constructor(
    private readonly datasource: IngresoProductoDataSource
  ) {}

  createIngreso(
    dto: CreateIngresoProductoDto
  ): Promise<IngresoProductoEntity> {
    return this.datasource.createIngreso(dto);
  }

  updateIngreso(
    id_ingreso: string,
    dto: UpdateIngresoProductoDto
  ): Promise<IngresoProductoEntity> {
    return this.datasource.updateIngreso(id_ingreso, dto);
  }

  getByProducto(
    id_producto: string
  ): Promise<IngresoProductoEntity[]> {
    return this.datasource.getByProducto(id_producto);
  }

  getByAlmacen(
    id_almacen: string
  ): Promise<IngresoProductoEntity[]> {
    return this.datasource.getByAlmacen(id_almacen);
  }
}
