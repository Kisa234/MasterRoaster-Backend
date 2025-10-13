import { ProductoEntity } from "../../entities/producto.entity";
import { ProductoRepository } from "../../repository/producto.repository";

export interface DeleteProductoUseCase {
    execute(id: string): Promise<ProductoEntity>;
}

export class DeleteProducto implements DeleteProductoUseCase {
    constructor(private readonly productoRepository: ProductoRepository) {}

    async execute(id: string): Promise<ProductoEntity> {
        return this.productoRepository.deleteProducto(id);
    }
}