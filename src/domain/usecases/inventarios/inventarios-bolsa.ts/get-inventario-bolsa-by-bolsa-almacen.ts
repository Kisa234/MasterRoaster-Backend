import { InventarioBolsaEntity } from "../../../entities/inventarioBolsa.entity";
import { InventarioBolsaRepository } from "../../../repository/inventario-bolsa.repository";

export interface GetInventarioBolsaByBolsaAndAlmacenUseCase {
    execute(id_bolsa: string, id_almacen: string): Promise<InventarioBolsaEntity | null>;
}

export class GetInventarioBolsaByBolsaAndAlmacen implements GetInventarioBolsaByBolsaAndAlmacenUseCase {
    constructor(private readonly repository: InventarioBolsaRepository) { }

    async execute(id_bolsa: string, id_almacen: string): Promise<InventarioBolsaEntity | null> {
        return this.repository.getByBolsaAndAlmacen(id_bolsa, id_almacen);
    }
}
