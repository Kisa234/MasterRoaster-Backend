import { prisma } from "../../data/postgres";
import { InventarioDataSource } from "../../domain/datasources/inventario.datasource";
import { CreateInventarioDto } from "../../domain/dtos/inventario/create";
import { UpdateInventarioDto } from "../../domain/dtos/inventario/update";
import { InventarioEntity } from "../../domain/entities/inventario.entity";

export class InventarioDataSourceImpl implements InventarioDataSource {
  getInventariosByProducto(id_producto: string): Promise<InventarioEntity[]> {
      throw new Error("Method not implemented.");
  }

  getAllInventarios(): Promise<InventarioEntity[]> {
      throw new Error("Method not implemented.");
  }
  
  async createInventario(dto: CreateInventarioDto): Promise<InventarioEntity> {
    const inventario = await prisma.inventario.create({ data: dto });
    return InventarioEntity.fromObject(inventario);
  }

  async getInventarioById(id: string): Promise<InventarioEntity | null> {
    const inv = await prisma.inventario.findUnique({
      where: { id_inventario: id }
    });
    if (!inv) return null;
    return InventarioEntity.fromObject(inv);
  }

  async updateInventario(id: string, dto: UpdateInventarioDto): Promise<InventarioEntity> {
    const updated = await prisma.inventario.update({
      where: { id_inventario: id },
      data: dto.values
    });
    return InventarioEntity.fromObject(updated);
  }

  async deleteInventario(id: string): Promise<InventarioEntity> {
    const deleted = await prisma.inventario.delete({
      where: { id_inventario: id }
    });
    return InventarioEntity.fromObject(deleted);
  }

  async getInventarios(): Promise<InventarioEntity[]> {
    const items = await prisma.inventario.findMany();
    return items.map(i => InventarioEntity.fromObject(i));
  }
}
