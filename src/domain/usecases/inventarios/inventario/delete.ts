import { InventarioEntity } from "../../entities/inventario.entity";
import { InventarioRepository } from "../../repository/inventario.repository";

export interface DeleteInventarioUseCase {
    execute(id: string): Promise<InventarioEntity>;
}

export class DeleteInventario implements DeleteInventarioUseCase {
    constructor(private readonly inventarioRepository: InventarioRepository) {}
    
    async execute(id: string): Promise<InventarioEntity> {
        return this.inventarioRepository.deleteInventario(id);
    }
}