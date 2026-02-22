import { InventarioProductoEntity } from "../../../entities/inventario-producto.entity";
import { InventarioProductoRepository } from "../../../repository/inventario-producto.repository";

export interface DeleteInventarioProductoUseCase {
    execute(id: string): Promise<InventarioProductoEntity>;
}

export class DeleteInventarioProducto implements DeleteInventarioProductoUseCase {
    constructor(private readonly inventarioRepository: InventarioProductoRepository) {}
    
    async execute(id: string): Promise<InventarioProductoEntity> {
        return this.inventarioRepository.deleteInventario(id);
    }
}