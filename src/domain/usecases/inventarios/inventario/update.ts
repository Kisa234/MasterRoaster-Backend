import { UpdateInventarioDto } from "../../../dtos/inventarios/inventario/update";
import { InventarioEntity } from "../../../entities/inventario.entity";
import { InventarioRepository } from "../../../repository/inventario.repository";


export interface UpdateInventarioUseCase {
    execute(id: string, data: UpdateInventarioDto): Promise<InventarioEntity | null>;
}

export class UpdateInventario implements UpdateInventarioUseCase {
    constructor(private readonly inventarioRepository: InventarioRepository) {}

    async execute(id: string, data: UpdateInventarioDto): Promise<InventarioEntity | null> {
        return this.inventarioRepository.updateInventario(id, data);
    }
}