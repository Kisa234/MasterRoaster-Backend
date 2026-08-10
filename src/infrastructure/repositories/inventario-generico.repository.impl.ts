import { Prisma } from "@prisma/client";
import { InventarioGenericoDataSource, InventarioItemRef } from "../../domain/datasources/inventario-generico.datasource";
import { InventarioGenericoRepository } from "../../domain/repository/inventario-generico.repository";

export class InventarioGenericoRepositoryImpl implements InventarioGenericoRepository {
    constructor(private readonly datasource: InventarioGenericoDataSource) { }

    obtenerStockDisponible(item: InventarioItemRef, tx?: Prisma.TransactionClient): Promise<number> {
        return this.datasource.obtenerStockDisponible(item, tx);
    }
    descontarStock(item: InventarioItemRef, tx?: Prisma.TransactionClient): Promise<void> {
        return this.datasource.descontarStock(item, tx);
    }
    reingresarStock(item: InventarioItemRef, tx?: Prisma.TransactionClient): Promise<void> {
        return this.datasource.reingresarStock(item, tx);
    }
}