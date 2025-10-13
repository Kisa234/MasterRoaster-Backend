import { ProductoComponenteRepository } from "../../repository/producto-componente.repository";
import { ProductoComponenteEntity } from './../../entities/productoComponente.entity';

export interface DeleteProductoComponenteUseCase {
    execute(id: string, id_2:string): Promise<ProductoComponenteEntity>;
}

export class DeleteProductoComponente implements DeleteProductoComponenteUseCase {
    constructor(private readonly productoComponenteRepository: ProductoComponenteRepository) {}

    async execute(id: string, id_2:string): Promise<ProductoComponenteEntity> {
        return this.productoComponenteRepository.deleteComponente(id, id_2);
    }
}