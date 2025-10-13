import { UpdateProductoDto } from "../../dtos/producto/update";
import { ProductoEntity } from "../../entities/producto.entity";
import { ProductoRepository } from "../../repository/producto.repository";

export interface UpdateProductoUseCase {
    execute(id: string, data: UpdateProductoDto): Promise<ProductoEntity | null>;
}

export class UpdateProducto implements UpdateProductoUseCase {
    constructor(private readonly productoRepository: ProductoRepository) {}

    async execute(id: string, data: UpdateProductoDto): Promise<ProductoEntity | null> {
        return this.productoRepository.updateProducto(id, data);
    }
}
