import { prisma } from "../../data/postgres";
import { ProductoComponenteDataSource } from "../../domain/datasources/productoComponente.datasource";
import { CreateProductoComponenteDto } from "../../domain/dtos/producto-componente/create";
import { UpdateProductoComponenteDto } from "../../domain/dtos/producto-componente/update";
import { ProductoComponenteEntity } from "../../domain/entities/productoComponente.entity";

export class ProductoComponenteDataSourceImpl implements ProductoComponenteDataSource {

  async getComponentesByCombo(id_combo: string): Promise<ProductoComponenteEntity[]> {
    const componentes = await prisma.productoComponente.findMany({
      where: { id_combo }
    });
    return componentes.map(pc => ProductoComponenteEntity.fromObject(pc));
  }

  async getComponente(id_combo: string, id_producto: string): Promise<ProductoComponenteEntity | null> {
    const pc = await prisma.productoComponente.findUnique({
      where: { id_combo_id_producto: { id_combo, id_producto } }
    });
    if (!pc) return null;
    return ProductoComponenteEntity.fromObject(pc);
  }

  async createComponente(dto: CreateProductoComponenteDto): Promise<ProductoComponenteEntity> {
    const pc = await prisma.productoComponente.create({ data: dto });
    return ProductoComponenteEntity.fromObject(pc);
  }

  async getComponenteById(id_combo: string, id_producto: string): Promise<ProductoComponenteEntity | null> {
    const pc = await prisma.productoComponente.findUnique({
      where: { id_combo_id_producto: { id_combo, id_producto } }
    });
    if (!pc) return null;
    return ProductoComponenteEntity.fromObject(pc);
  }

  async updateComponente(id_combo: string, id_producto: string, dto: UpdateProductoComponenteDto): Promise<ProductoComponenteEntity> {
    const updated = await prisma.productoComponente.update({
      where: { id_combo_id_producto: { id_combo, id_producto } },
      data: dto.values
    });
    return ProductoComponenteEntity.fromObject(updated);
  }

  async deleteComponente(id_combo: string, id_producto: string): Promise<ProductoComponenteEntity> {
    const deleted = await prisma.productoComponente.delete({
      where: { id_combo_id_producto: { id_combo, id_producto } }
    });
    return ProductoComponenteEntity.fromObject(deleted);
  }

  async getComponentes(): Promise<ProductoComponenteEntity[]> {
    const pcs = await prisma.productoComponente.findMany();
    return pcs.map(pc => ProductoComponenteEntity.fromObject(pc));
  }
}
