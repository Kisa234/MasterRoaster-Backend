import { CreateInventarioDto } from "../../dtos/inventario/create";
import { InventarioEntity } from "../../entities/inventario.entity";
import { InventarioRepository } from "../../repository/inventario.repository";

export interface CreateInventarioUseCase {
    execute(data: CreateInventarioDto): Promise<InventarioEntity>;
}

export class CreateInventario implements CreateInventarioUseCase {
    constructor(private readonly inventarioRepository: InventarioRepository) {}
    
    async execute(data: CreateInventarioDto): Promise<InventarioEntity> {
        return this.inventarioRepository.createInventario(data);
    }
}