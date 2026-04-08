import { InventarioInsumoEntity } from "../../../entities/inventario-insumo.entity";
import { InventarioInsumoRepository } from "../../../repository/inventario-insumo.repository";

export interface GetAllInventarioInsumoUseCase {
    execute(): Promise<InventarioInsumoEntity[]>;
}

export class GetAllInventarioInsumo implements GetAllInventarioInsumoUseCase {
    constructor(private readonly inventarioInsumoRepository: InventarioInsumoRepository) {}

    async execute(): Promise<InventarioInsumoEntity[]> {
        return this.inventarioInsumoRepository.getAllInventarios();
    }
}