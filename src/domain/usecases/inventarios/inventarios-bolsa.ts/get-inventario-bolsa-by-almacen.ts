import { InventarioBolsaEntity } from "../../../entities/inventarioBolsa.entity";
import { InventarioBolsaRepository } from "../../../repository/inventario-bolsa.repository";

export interface GetInventarioBolsaByAlmacenUseCase {
    execute(id_almacen: string): Promise<InventarioBolsaEntity[]>;
}

export class GetInventarioBolsaByAlmacen implements GetInventarioBolsaByAlmacenUseCase {
    constructor(private readonly repository: InventarioBolsaRepository) { }

    async execute(id_almacen: string): Promise<InventarioBolsaEntity[]> {
        return this.repository.getByAlmacen(id_almacen);
    }
}
