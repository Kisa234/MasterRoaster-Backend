import { InventarioEntity } from "../../../entities/inventario.entity";
import { InventarioRepository } from "../../../repository/inventario.repository";


export interface GetInventarioByIdUseCase {
    execute(id: string): Promise<InventarioEntity | null>;
}

export class GetInventarioById implements GetInventarioByIdUseCase {
    constructor(private readonly inventarioRepository: InventarioRepository) {}

    async execute(id: string): Promise<InventarioEntity | null> {
        return this.inventarioRepository.getInventarioById(id);
    }
}
