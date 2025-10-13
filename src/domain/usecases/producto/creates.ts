import { CreateProductoDto } from "../../dtos/producto/create";
import { ProductoEntity } from "../../entities/producto.entity";
import { ProductoRepository } from "../../repository/producto.repository";

export interface CreateProductoUseCase {
    execute(data: CreateProductoDto): Promise<ProductoEntity>;
}

export class CreateProducto implements CreateProductoUseCase {
    constructor(private readonly productoRepository: ProductoRepository) {}

    async execute(data: CreateProductoDto): Promise<ProductoEntity> {
        return this.productoRepository.createProducto(data);
    }
}