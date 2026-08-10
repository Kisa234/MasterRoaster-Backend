import { Prisma } from "@prisma/client";
import { InventarioItemRef } from "../datasources/inventario-generico.datasource";

export abstract class InventarioGenericoRepository {
    abstract obtenerStockDisponible(item: InventarioItemRef, tx?: Prisma.TransactionClient): Promise<number>;
    abstract descontarStock(item: InventarioItemRef, tx?: Prisma.TransactionClient): Promise<void>;
    abstract reingresarStock(item: InventarioItemRef, tx?: Prisma.TransactionClient): Promise<void>;
}