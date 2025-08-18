// src/infrastructure/datasources/producto.datasource.impl.ts
import { prisma } from "../../data/postgres";
import { ProductoDataSource } from "../../domain/datasources/producto.datasource";
import { CreateProductoDto } from "../../domain/dtos/producto/producto/create";
import { UpdateProductoDto } from "../../domain/dtos/producto/producto/update";
import { ProductoEntity } from "../../domain/entities/producto.entity";

export class ProductoDataSourceImpl implements ProductoDataSource {

  // CREATE
  async createProducto(dto: CreateProductoDto): Promise<ProductoEntity> {
    const nuevo = await prisma.producto.create({ data: dto });
    return ProductoEntity.fromObject(nuevo);
  }

  // READ
  async getProductoById(id: string): Promise<ProductoEntity | null> {
    const row = await prisma.producto.findFirst({ where: { id_producto: id } });
    return row ? ProductoEntity.fromObject(row) : null;
  }

  async getProductos(): Promise<ProductoEntity[]> {
    const productos = await prisma.producto.findMany({
      orderBy: { fecha_registro: "desc" }
    });
    return productos.map(ProductoEntity.fromObject);
  }

  async getProductosActivos(): Promise<ProductoEntity[]> {
    const productos = await prisma.producto.findMany({
      where: { activo: true },
      orderBy: { fecha_registro: "desc" }
    });
    return productos.map(ProductoEntity.fromObject);
  }

  async getProductosByLote(id_lote: string): Promise<ProductoEntity[]> {
    const productos = await prisma.producto.findMany({
      where: { id_lote },
      orderBy: { fecha_registro: "desc" }
    });
    return productos.map(ProductoEntity.fromObject);
  }

  async buscarProductos(query: string): Promise<ProductoEntity[]> {
    const q = (query ?? "").trim();
    if (!q) return [];
    const productos = await prisma.producto.findMany({
      where: {
        OR: [
          { nombre: { contains: q, mode: "insensitive" } },
          { descripcion: { contains: q, mode: "insensitive" } }
        ]
      },
      orderBy: { fecha_registro: "desc" }
    });
    return productos.map(ProductoEntity.fromObject);
  }

  // UPDATE
  async updateProducto(id: string, dto: UpdateProductoDto): Promise<ProductoEntity> {
    const updated = await prisma.producto.update({
      where: { id_producto: id },
      data: { ...dto.values, fecha_editado: new Date() }
    });
    return ProductoEntity.fromObject(updated);
  }

  async toggleProductoActivo(id: string, activo: boolean): Promise<ProductoEntity> {
    const updated = await prisma.producto.update({
      where: { id_producto: id },
      data: { activo, fecha_editado: new Date() }
    });
    return ProductoEntity.fromObject(updated);
  }

  async vincularLote(id: string, id_lote: string | null): Promise<ProductoEntity> {
    const updated = await prisma.producto.update({
      where: { id_producto: id },
      data: { id_lote, fecha_editado: new Date() }
    });
    return ProductoEntity.fromObject(updated);
  }

  // DELETE (a falta de campo `eliminado`, hacemos baja lógica con `activo=false`)
  async deleteProducto(id: string): Promise<ProductoEntity> {
    const updated = await prisma.producto.update({
      where: { id_producto: id },
      data: { activo: false, fecha_editado: new Date() }
    });
    return ProductoEntity.fromObject(updated);
  }
}
