import { CreateProductoDto } from "../../dtos/producto/create";
import { ProductoEntity } from "../../entities/producto.entity";
import { ProductoRepository } from "../../repository/producto.repository";

export interface CreateProductoUseCase {
    execute(data: CreateProductoDto): Promise<ProductoEntity>;
}

export class CreateProducto implements CreateProductoUseCase {
    constructor(private readonly productoRepository: ProductoRepository) {}

    async execute(data: CreateProductoDto): Promise<ProductoEntity> {
        const allProductos = await this.productoRepository.getAllProductos();
        const nextNumber = allProductos.length + 1;
        const id_producto = `PROD${nextNumber.toString().padStart(3, '0')}`;


        const [error, dto] = CreateProductoDto.create({
            ...data,
            id_producto,
        });
        if (error) throw new Error(error);

        return this.productoRepository.createProducto(dto!);
    }
}
