import { CreateProductoDto } from "../../domain/dtos/producto/create";
import { UpdateProductoDto } from "../../domain/dtos/producto/update";
import { ProductoEntity } from "../../domain/entities/producto.entity";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { ProductoDataSourceImpl } from "../datasources/producto.datasource.impl";

export class ProductoRepositoryImpl implements ProductoRepository {

    constructor(private readonly datasource: ProductoDataSourceImpl) {}

    createProducto(createProductoDto: CreateProductoDto): Promise<ProductoEntity> {
        return this.datasource.createProducto(createProductoDto);
    }
    updateProducto(id: string, updateProductoDto: UpdateProductoDto): Promise<ProductoEntity> {
        return this.datasource.updateProducto(id, updateProductoDto);
    }
    getProductoById(id: string): Promise<ProductoEntity | null> {
        return this.datasource.getProductoById(id);
    }
    getAllProductos(): Promise<ProductoEntity[]> {
        return this.datasource.getAllProductos();
    }
    deleteProducto(id: string): Promise<ProductoEntity> {
        return this.datasource.deleteProducto(id);
    }



}