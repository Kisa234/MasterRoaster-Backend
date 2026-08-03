// Datasource "puente" entre el campo genérico PaqueteItem.entidad
// (EntidadInventario: LOTE | LOTE_TOSTADO | BOLSA | PRODUCTO | INSUMO | MUESTRA)
// y las tablas de inventario concretas. Es el mismo espíritu que ya usa
// MovimientoAlmacen con su campo `entidad` + `id_entidad_primario`.

export interface InventarioItemRef {
    entidad: string;        // EntidadInventario
    id_entidad: string;
    id_almacen: string;
    cantidad: number;
    gramaje?: number | null;   // solo relevante para PRODUCTO
    molienda?: string | null;  // solo relevante para PRODUCTO
}

export abstract class InventarioGenericoDataSource {
    abstract obtenerStockDisponible(item: InventarioItemRef): Promise<number>;
    abstract descontarStock(item: InventarioItemRef): Promise<void>;
    abstract reingresarStock(item: InventarioItemRef): Promise<void>;
}
