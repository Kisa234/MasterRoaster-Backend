import { prisma } from "../../data/postgres";
import { ProductoDataSource } from "../../domain/datasources/producto.datasource";
import { CreateProductoDto } from "../../domain/dtos/producto/create";
import { UpdateProductoDto } from "../../domain/dtos/producto/update";
import { ProductoEntity } from "../../domain/entities/producto.entity";

export class ProductoDataSourceImpl implements ProductoDataSource {
  
  async getAllProductos(): Promise<ProductoEntity[]> {
    const productos = await prisma.producto.findMany();
    return productos.map(p => ProductoEntity.fromObject(p));
  }
  
  async createProducto(createProductoDto: CreateProductoDto): Promise<ProductoEntity> {
    const producto = await prisma.producto.create({
      data: createProductoDto!
    });
    return ProductoEntity.fromObject(producto);
  }

  async getProductoById(id: string): Promise<ProductoEntity | null> {
    const producto = await prisma.producto.findUnique({
      where: { id_producto: id }
    });
    if (!producto) return null;
    return ProductoEntity.fromObject(producto);
  }

  async updateProducto(id: string, updateProductoDto: UpdateProductoDto): Promise<ProductoEntity> {
    const updated = await prisma.producto.update({
      where: { id_producto: id },
      data: updateProductoDto.values
    });
    return ProductoEntity.fromObject(updated);
  }

  async deleteProducto(id: string): Promise<ProductoEntity> {
    const deleted = await prisma.producto.update({
      where: { id_producto: id },
      data: { activo: false }
    });
    return ProductoEntity.fromObject(deleted);
  }

  async getProductos(): Promise<ProductoEntity[]> {
    const productos = await prisma.producto.findMany({
      where: { activo: true }
    });
    return productos.map(p => ProductoEntity.fromObject(p));
  }
}
