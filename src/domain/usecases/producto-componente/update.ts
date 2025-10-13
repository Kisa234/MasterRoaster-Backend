import { UpdateProductoDto } from "../../dtos/producto/update";
import { ProductoComponenteEntity } from "../../entities/productoComponente.entity";
import { ProductoComponenteRepository } from "../../repository/producto-componente.repository";

export interface UpdateProductoComponenteUseCase {
    execute(id: string, id_2: string, data: UpdateProductoDto): Promise<ProductoComponenteEntity | null>;
}

export class UpdateProductoComponente implements UpdateProductoComponenteUseCase {
    constructor(private readonly productoComponenteRepository: ProductoComponenteRepository) {}

    async execute(id: string, id_2: string, data: UpdateProductoDto): Promise<ProductoComponenteEntity | null> {
        return this.productoComponenteRepository.updateComponente(id, id_2, data);
    }
}