import { InventarioProductoEntity } from "../../../entities/inventario-producto.entity";
import { InventarioProductoRepository } from "../../../repository/inventario-producto.repository";

export interface GetAllInventarioProductoUseCase {
    execute(): Promise<InventarioProductoEntity[]>;
}

export class GetAllInventarioProducto implements GetAllInventarioProductoUseCase {
    constructor(private readonly inventarioRepository: InventarioProductoRepository) {}

    async execute(): Promise<InventarioProductoEntity[]> {
        return this.inventarioRepository.getAllInventarios();
    }
}