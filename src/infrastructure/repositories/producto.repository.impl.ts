import { ProductoDataSource } from "../../domain/datasources/producto.datasource";
import { CreateProductoDto } from "../../domain/dtos/producto/producto/create";
import { UpdateProductoDto } from "../../domain/dtos/producto/producto/update";
import { ProductoEntity } from "../../domain/entities/producto.entity";
import { ProductoRepository } from "../../domain/repository/producto.repository";

export class ProductoRepositoryImpl implements ProductoRepository {

    constructor(
        private readonly productoDatasource: ProductoDataSource
    ) { }

    // CREATE
    createProducto(dto: CreateProductoDto): Promise<ProductoEntity> {
        return this.productoDatasource.createProducto(dto);
    }

    // READ
    getProductoById(id: string): Promise<ProductoEntity | null> {
        return this.productoDatasource.getProductoById(id);
    }

    getProductos(): Promise<ProductoEntity[]> {
        return this.productoDatasource.getProductos();
    }

    getProductosActivos(): Promise<ProductoEntity[]> {
        return this.productoDatasource.getProductosActivos();
    }

    getProductosByLote(id_lote: string): Promise<ProductoEntity[]> {
        return this.productoDatasource.getProductosByLote(id_lote);
    }

    buscarProductos(query: string): Promise<ProductoEntity[]> {
        return this.productoDatasource.buscarProductos(query);
    }

    // UPDATE
    updateProducto(id: string, dto: UpdateProductoDto): Promise<ProductoEntity> {
        return this.productoDatasource.updateProducto(id, dto);
    }

    toggleProductoActivo(id: string, activo: boolean): Promise<ProductoEntity> {
        return this.productoDatasource.toggleProductoActivo(id, activo);
    }

    vincularLote(id: string, id_lote: string | null): Promise<ProductoEntity> {
        return this.productoDatasource.vincularLote(id, id_lote);
    }

    // DELETE
    deleteProducto(id: string): Promise<ProductoEntity> {
        return this.productoDatasource.deleteProducto(id);
    }
}
