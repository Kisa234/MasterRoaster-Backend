import { ProductoEntity } from "../../entities/producto.entity";
import { ProductoRepository } from "../../repository/producto.repository";

export interface GetAllProductosUseCase {
    execute(): Promise<ProductoEntity[]>;
}

export class GetAllProductos implements GetAllProductosUseCase {
    constructor(private readonly productoRepository: ProductoRepository) {}

    async execute(): Promise<ProductoEntity[]> {
        return this.productoRepository.getAllProductos();
    }
}