import { InventarioGenericoDataSource, InventarioItemRef } from "../../domain/datasources/inventario-generico.datasource";
import { InventarioGenericoRepository } from "../../domain/repository/inventario-generico.repository";

export class InventarioGenericoRepositoryImpl implements InventarioGenericoRepository {
    constructor(private readonly datasource: InventarioGenericoDataSource) { }

    obtenerStockDisponible(item: InventarioItemRef): Promise<number> {
        return this.datasource.obtenerStockDisponible(item);
    }
    descontarStock(item: InventarioItemRef): Promise<void> {
        return this.datasource.descontarStock(item);
    }
    reingresarStock(item: InventarioItemRef): Promise<void> {
        return this.datasource.reingresarStock(item);
    }
}
