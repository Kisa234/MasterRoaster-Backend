import { ProductoEntity } from "../../entities/producto.entity";
import { ProductoRepository } from "../../repository/producto.repository";

export interface GetProductoByIdUseCase {
    execute(id: string): Promise<ProductoEntity | null>;
}

export class GetProductoById implements GetProductoByIdUseCase {
    constructor(private readonly productoRepository: ProductoRepository) {}

    async execute(id: string): Promise<ProductoEntity | null> {
        return this.productoRepository.getProductoById(id);
    }
}