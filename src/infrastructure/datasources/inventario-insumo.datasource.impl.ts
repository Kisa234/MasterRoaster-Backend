import { prisma } from "../../data/postgres";
import { InventarioInsumoDataSource } from "../../domain/datasources/inventario-insumo.datasource";
import { CreateInventarioInsumoDto } from "../../domain/dtos/inventarios/inventario-insumo/create";
import { UpdateInventarioInsumoDto } from "../../domain/dtos/inventarios/inventario-insumo/update";
import { InventarioInsumoEntity } from "../../domain/entities/inventario-insumo.entity";

export class InventarioInsumoDataSourceImpl
  implements InventarioInsumoDataSource {

  async createInventario(
    dto: CreateInventarioInsumoDto
  ): Promise<InventarioInsumoEntity> {

    const inventario = await prisma.inventarioInsumo.create({
      data: {
        id_insumo: dto.id_insumo,
        id_almacen: dto.id_almacen,
        cantidad: dto.cantidad,
      },
    });

    return InventarioInsumoEntity.fromObject(inventario);
  }

  async updateInventario(
    id_inventario: string,
    dto: UpdateInventarioInsumoDto
  ): Promise<InventarioInsumoEntity> {

    const inventario = await prisma.inventarioInsumo.update({
      where: { id_inventario },
      data: dto.values,
    });

    return InventarioInsumoEntity.fromObject(inventario);
  }

  async getByInsumoAndAlmacen(
    id_insumo: string,
    id_almacen: string
  ): Promise<InventarioInsumoEntity | null> {

    const inventario = await prisma.inventarioInsumo.findFirst({
      where: {
        id_insumo,
        id_almacen,
      },
    });

    if (!inventario) return null;
    return InventarioInsumoEntity.fromObject(inventario);
  }

  async getByAlmacen(
    id_almacen: string
  ): Promise<InventarioInsumoEntity[]> {

    const inventarios = await prisma.inventarioInsumo.findMany({
      where: { id_almacen },
      orderBy: { fecha_registro: "asc" },
    });

    return inventarios.map(InventarioInsumoEntity.fromObject);
  }
}
