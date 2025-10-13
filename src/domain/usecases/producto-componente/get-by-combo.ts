import { ProductoComponenteEntity } from "../../entities/productoComponente.entity";
import { ProductoComponenteRepository } from "../../repository/producto-componente.repository";

export interface GetProductoComponenteByComboUseCase {
    execute(id: string): Promise<ProductoComponenteEntity[]>;
}

export class GetProductoComponenteByCombo implements GetProductoComponenteByComboUseCase {
    constructor(private readonly productoComponenteRepository: ProductoComponenteRepository) {}

    async execute(id: string): Promise<ProductoComponenteEntity[]> {
        return this.productoComponenteRepository.getComponentesByCombo(id);
    }
}