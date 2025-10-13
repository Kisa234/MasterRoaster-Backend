import { CreateProductoDto } from "../dtos/producto/create";
import { UpdateProductoDto } from "../dtos/producto/update";
import { ProductoEntity } from "../entities/producto.entity";

export abstract class ProductoRepository {
    abstract createProducto(createProductoDto: CreateProductoDto): Promise<ProductoEntity>;
    abstract updateProducto(id: string, updateProductoDto: UpdateProductoDto): Promise<ProductoEntity>;
    abstract getProductoById(id: string): Promise<ProductoEntity | null>;
    abstract getAllProductos(): Promise<ProductoEntity[]>;
    abstract deleteProducto(id: string): Promise<ProductoEntity>;
}
