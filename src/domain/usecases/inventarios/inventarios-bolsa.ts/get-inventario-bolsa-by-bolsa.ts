import { InventarioBolsaEntity } from "../../../entities/inventarioBolsa.entity";
import { InventarioBolsaRepository } from "../../../repository/inventario-bolsa.repository";

export interface GetInventarioBolsaByBolsaUseCase {
    execute(id_bolsa: string): Promise<InventarioBolsaEntity[]>;
}

export class GetInventarioBolsaByBolsa implements GetInventarioBolsaByBolsaUseCase {
    constructor(private readonly repository: InventarioBolsaRepository) { }

    async execute(id_bolsa: string): Promise<InventarioBolsaEntity[]> {
        return this.repository.getByBolsa(id_bolsa);
    }
}
