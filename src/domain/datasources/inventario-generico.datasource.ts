import { Prisma } from "@prisma/client";

export interface InventarioItemRef {
    entidad: string;
    id_entidad: string;
    id_almacen: string;
    cantidad: number;
    gramaje?: number | null;
    molienda?: string | null;
}

export abstract class InventarioGenericoDataSource {
    abstract obtenerStockDisponible(item: InventarioItemRef, tx?: Prisma.TransactionClient): Promise<number>;
    abstract descontarStock(item: InventarioItemRef, tx?: Prisma.TransactionClient): Promise<void>;
    abstract reingresarStock(item: InventarioItemRef, tx?: Prisma.TransactionClient): Promise<void>;
}