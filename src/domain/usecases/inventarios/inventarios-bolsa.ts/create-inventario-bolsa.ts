import { CreateInventarioBolsaDto } from "../../../dtos/inventarios/inventario-bolsa/create";
import { InventarioBolsaEntity } from "../../../entities/inventarioBolsa.entity";
import { InventarioBolsaRepository } from "../../../repository/inventario-bolsa.repository";

export interface CreateInventarioBolsaUseCase {
    execute(dto: CreateInventarioBolsaDto): Promise<InventarioBolsaEntity>;
}

export class CreateInventarioBolsa implements CreateInventarioBolsaUseCase {
    constructor(private readonly repository: InventarioBolsaRepository) { }

    async execute(dto: CreateInventarioBolsaDto): Promise<InventarioBolsaEntity> {
        return this.repository.createInventario(dto);
    }
}
