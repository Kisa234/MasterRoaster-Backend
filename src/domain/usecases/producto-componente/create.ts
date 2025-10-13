import { CreateProductoComponenteDto } from "../../dtos/producto-componente/create";
import { ProductoComponenteEntity } from "../../entities/productoComponente.entity";
import { ProductoComponenteRepository } from "../../repository/producto-componente.repository";

export interface CreateProductoComponenteUseCase {
    execute(data: CreateProductoComponenteDto): Promise<ProductoComponenteEntity>;
}

export class CreateProductoComponente implements CreateProductoComponenteUseCase {
    constructor(private readonly productoComponenteRepository: ProductoComponenteRepository) {}

    async execute(data: CreateProductoComponenteDto): Promise<ProductoComponenteEntity> {
        return this.productoComponenteRepository.createComponente(data);
    }
}
