import { prisma } from "../../data/postgres";
import { IngresoProductoDataSource } from "../../domain/datasources/ingreso-producto.datasource";
import { CreateIngresoProductoDto } from "../../domain/dtos/ingreso-producto/create";
import { UpdateIngresoProductoDto } from "../../domain/dtos/ingreso-producto/update";
import { IngresoProductoEntity } from "../../domain/entities/ingreso-producto.entity";

export class IngresoProductoDataSourceImpl
  implements IngresoProductoDataSource {

  async createIngreso(
    dto: CreateIngresoProductoDto
  ): Promise<IngresoProductoEntity> {

    const ingreso = await prisma.ingresoProducto.create({
      data: {
        id_producto: dto.id_producto,
        id_variante: dto.id_variante,
        id_almacen: dto.id_almacen,
        cantidad: dto.cantidad,
        precio_compra: dto.precio_compra,
      },
    });

    return IngresoProductoEntity.fromObject(ingreso);
  }

  async updateIngreso(
    id_ingreso: string,
    dto: UpdateIngresoProductoDto
  ): Promise<IngresoProductoEntity> {

    const ingreso = await prisma.ingresoProducto.update({
      where: { id_ingreso },
      data: dto.values,
    });

    return IngresoProductoEntity.fromObject(ingreso);
  }

  async getByProducto(
    id_producto: string
  ): Promise<IngresoProductoEntity[]> {

    const ingresos = await prisma.ingresoProducto.findMany({
      where: { id_producto },
      orderBy: { fecha_ingreso: "desc" },
    });

    return ingresos.map(IngresoProductoEntity.fromObject);
  }

  async getByAlmacen(
    id_almacen: string
  ): Promise<IngresoProductoEntity[]> {

    const ingresos = await prisma.ingresoProducto.findMany({
      where: { id_almacen },
      orderBy: { fecha_ingreso: "desc" },
    });

    return ingresos.map(IngresoProductoEntity.fromObject);
  }
}
