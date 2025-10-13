import { ProductoComponenteEntity } from "../../entities/productoComponente.entity";
import { ProductoComponenteRepository } from "../../repository/producto-componente.repository";

export interface GetProductoComponenteByIdUseCase {
    execute(id: string, id_2: string): Promise<ProductoComponenteEntity | null>;
}

export class GetProductoComponenteById implements GetProductoComponenteByIdUseCase {
    constructor(private readonly productoComponenteRepository: ProductoComponenteRepository) {}

    async execute(id: string, id_2: string): Promise<ProductoComponenteEntity | null> {
        return this.productoComponenteRepository.getComponente(id, id_2);
    }
}