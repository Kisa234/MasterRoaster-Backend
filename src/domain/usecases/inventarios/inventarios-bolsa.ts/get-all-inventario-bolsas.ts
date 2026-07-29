import { InventarioBolsaEntity } from "../../../entities/inventarioBolsa.entity";
import { InventarioBolsaRepository } from "../../../repository/inventario-bolsa.repository";

export interface GetAllInventarioBolsasUseCase {
    execute(): Promise<InventarioBolsaEntity[]>;
}

export class GetAllInventarioBolsas implements GetAllInventarioBolsasUseCase {
    constructor(private readonly repository: InventarioBolsaRepository) { }

    async execute(): Promise<InventarioBolsaEntity[]> {
        return this.repository.getAllInventarios();
    }
}
