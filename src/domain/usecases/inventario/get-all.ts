import { InventarioEntity } from "../../entities/inventario.entity";
import { InventarioRepository } from "../../repository/inventario.repository";

export interface GetAllInventarioUseCase {
    execute(): Promise<InventarioEntity[]>;
}

export class GetAllInventario implements GetAllInventarioUseCase {
    constructor(private readonly inventarioRepository: InventarioRepository) {}

    async execute(): Promise<InventarioEntity[]> {
        return this.inventarioRepository.getAllInventarios();
    }
}