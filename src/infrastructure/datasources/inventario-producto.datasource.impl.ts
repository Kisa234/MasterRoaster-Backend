import { Molienda } from "@prisma/client";
import { prisma } from "../../data/postgres";
import { InventarioProductoDataSource } from "../../domain/datasources/inventario-producto.datasource";
import { CreateInventarioProductoDto } from "../../domain/dtos/inventarios/inventario-producto/create";
import { UpdateInventarioProductoDto } from "../../domain/dtos/inventarios/inventario-producto/update";
import { InventarioProductoEntity } from "../../domain/entities/inventario-producto.entity";

export class InventarioProductoDataSourceImpl implements InventarioProductoDataSource {

  async getInventariosByProducto(id_producto: string): Promise<InventarioProductoEntity[]> {
    const items = await prisma.inventarioProducto.findMany({
      where: { id_producto }
    });
    return items.map(i => InventarioProductoEntity.fromObject(i));
  }

  async getAllInventarios(): Promise<InventarioProductoEntity[]> {
    const items = await prisma.inventarioProducto.findMany();
    return items.map(i => InventarioProductoEntity.fromObject(i));
  }

  async createInventario(dto: CreateInventarioProductoDto): Promise<InventarioProductoEntity> {
    const inventario = await prisma.inventarioProducto.create({ data: dto });
    return InventarioProductoEntity.fromObject(inventario);
  }

  async getInventarioById(id: string): Promise<InventarioProductoEntity | null> {
    const inv = await prisma.inventarioProducto.findUnique({
      where: { id_inventario: id }
    });
    if (!inv) return null;
    return InventarioProductoEntity.fromObject(inv);
  }

  async updateInventario(id: string, dto: UpdateInventarioProductoDto): Promise<InventarioProductoEntity> {
    const updated = await prisma.inventarioProducto.update({
      where: { id_inventario: id },
      data: dto.values
    });
    return InventarioProductoEntity.fromObject(updated);
  }

  async deleteInventario(id: string): Promise<InventarioProductoEntity> {
    const deleted = await prisma.inventarioProducto.delete({
      where: { id_inventario: id }
    });
    return InventarioProductoEntity.fromObject(deleted);
  }

  async getByProductoAndAlmacen(
    id_producto: string,
    id_almacen: string,
    gramaje: number,
    molienda?: Molienda | null
  ): Promise<InventarioProductoEntity | null> {
    const inventario = await prisma.inventarioProducto.findUnique({
      where: {
        id_producto_id_almacen_gramaje_molienda: {
          id_producto,
          id_almacen,
          gramaje: gramaje,
          molienda: molienda ?? 'NINGUNO',
        }
      }
    });

    if (!inventario) return null;

    return InventarioProductoEntity.fromObject(inventario);
  }

}
