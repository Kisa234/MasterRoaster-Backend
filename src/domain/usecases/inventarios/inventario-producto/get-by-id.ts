import { InventarioProductoEntity } from "../../../entities/inventario-producto.entity";
import { InventarioProductoRepository } from "../../../repository/inventario-producto.repository";

export interface GetInventarioProductoByIdUseCase {
    execute(id: string): Promise<InventarioProductoEntity | null>;
}

export class GetInventarioProductoById implements GetInventarioProductoByIdUseCase {
    constructor(private readonly inventarioRepository: InventarioProductoRepository) {}

    async execute(id: string): Promise<InventarioProductoEntity | null> {
        return this.inventarioRepository.getInventarioById(id);
    }
}