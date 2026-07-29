import { UpdateInventarioBolsaDto } from "../../../dtos/inventarios/inventario-bolsa/update";
import { InventarioBolsaEntity } from "../../../entities/inventarioBolsa.entity";
import { InventarioBolsaRepository } from "../../../repository/inventario-bolsa.repository";

export interface UpdateInventarioBolsaUseCase {
    execute(id: string, dto: UpdateInventarioBolsaDto): Promise<InventarioBolsaEntity>;
}

export class UpdateInventarioBolsa implements UpdateInventarioBolsaUseCase {
    constructor(private readonly repository: InventarioBolsaRepository) { }

    async execute(id: string, dto: UpdateInventarioBolsaDto): Promise<InventarioBolsaEntity> {
        return this.repository.updateInventario(id, dto);
    }
}
