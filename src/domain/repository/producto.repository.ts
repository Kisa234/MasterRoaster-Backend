import { CreateProductoDto } from '../dtos/producto/producto/create';
import { UpdateProductoDto } from '../dtos/producto/producto/update';
import { ProductoEntity } from '../entities/producto.entity';

export abstract class ProductoRepository {
  // CREATE
  abstract createProducto(dto: CreateProductoDto): Promise<ProductoEntity>;

  // READ
  abstract getProductoById(id: string): Promise<ProductoEntity | null>;
  abstract getProductos(): Promise<ProductoEntity[]>;
  abstract getProductosActivos(): Promise<ProductoEntity[]>;
  abstract getProductosByLote(id_lote: string): Promise<ProductoEntity[]>;
  abstract buscarProductos(query: string): Promise<ProductoEntity[]>;

  // UPDATE
  abstract updateProducto(id: string, dto: UpdateProductoDto): Promise<ProductoEntity>;
  abstract toggleProductoActivo(id: string, activo: boolean): Promise<ProductoEntity>;
  abstract vincularLote(id: string, id_lote: string | null): Promise<ProductoEntity>;

  // DELETE
  abstract deleteProducto(id: string): Promise<ProductoEntity>;
}
