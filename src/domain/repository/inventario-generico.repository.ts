import { InventarioItemRef } from "../datasources/inventario-generico.datasource";

export abstract class InventarioGenericoRepository {
    abstract obtenerStockDisponible(item: InventarioItemRef): Promise<number>;
    abstract descontarStock(item: InventarioItemRef): Promise<void>;
    abstract reingresarStock(item: InventarioItemRef): Promise<void>;
}
