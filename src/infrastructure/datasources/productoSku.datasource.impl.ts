import { prisma } from "../../data/postgres";
import { ProductoSkuDataSource } from "../../domain/datasources/productoSku.datasource";
import { CreateProductoSkuDto } from "../../domain/dtos/producto/productoSku/create";
import { UpdateProductoSkuDto } from "../../domain/dtos/producto/productoSku/update";
import { ProductoSkuEntity } from "../../domain/entities/productoSku.entity";

export class ProductoSkuDataSourceImpl implements ProductoSkuDataSource {

    // CREATE
    async createSku(dto: CreateProductoSkuDto): Promise<ProductoSkuEntity> {
        const created = await prisma.productoSKU.create({
            data: dto
        });
        return ProductoSkuEntity.fromObject(created);
    }

    // READ
    async getSkuById(id_sku: string): Promise<ProductoSkuEntity | null> {
        const row = await prisma.productoSKU.findFirst({ where: { id_sku } });
        return row ? ProductoSkuEntity.fromObject(row) : null;
    }

    async getSkuByCode(sku_code: string): Promise<ProductoSkuEntity | null> {
        const row = await prisma.productoSKU.findUnique({ where: { sku_code } });
        return row ? ProductoSkuEntity.fromObject(row) : null;
    }

    async getSkus(): Promise<ProductoSkuEntity[]> {
        const rows = await prisma.productoSKU.findMany({
            where: { eliminado: false },
            orderBy: { fecha_registro: "desc" }
        });
        return rows.map(ProductoSkuEntity.fromObject);
    }

    async getSkusByProducto(id_producto: string): Promise<ProductoSkuEntity[]> {
        const rows = await prisma.productoSKU.findMany({
            where: { id_producto, eliminado: false },
            orderBy: [{ gramaje: "asc" }, { molienda: "asc" }]
        });
        return rows.map(ProductoSkuEntity.fromObject);
    }

    async getSkusByLoteTostado(id_lote_tostado: string): Promise<ProductoSkuEntity[]> {
        const rows = await prisma.productoSKU.findMany({
            where: { id_lote_tostado, eliminado: false },
            orderBy: [{ gramaje: "asc" }, { molienda: "asc" }]
        });
        return rows.map(ProductoSkuEntity.fromObject);
    }

    // UPDATE (datos no-stock)
    async updateSku(id_sku: string, dto: UpdateProductoSkuDto): Promise<ProductoSkuEntity> {
        const updated = await prisma.productoSKU.update({
            where: { id_sku },
            data: { ...dto.values, fecha_editado: new Date() }
        });
        return ProductoSkuEntity.fromObject(updated);
    }

    async setSkuCode(id_sku: string, sku_code: string): Promise<ProductoSkuEntity> {
        const updated = await prisma.productoSKU.update({
            where: { id_sku },
            data: { sku_code, fecha_editado: new Date() }
        });
        return ProductoSkuEntity.fromObject(updated);
    }

    // STOCK
    async incrementStock(id_sku: string, unidades: number): Promise<ProductoSkuEntity> {
        if (!Number.isInteger(unidades) || unidades <= 0) {
            throw new Error("unidades debe ser un entero > 0");
        }
        const updated = await prisma.productoSKU.update({
            where: { id_sku },
            data: { cantidad: { increment: unidades }, fecha_editado: new Date() }
        });
        return ProductoSkuEntity.fromObject(updated);
    }

    async decrementStock(id_sku: string, unidades: number): Promise<ProductoSkuEntity> {
        if (!Number.isInteger(unidades) || unidades <= 0) {
            throw new Error("unidades debe ser un entero > 0");
        }
        return await prisma.$transaction(async (tx) => {
            const current = await tx.productoSKU.findUnique({ where: { id_sku } });
            if (!current) throw new Error("SKU no existe");
            if (current.cantidad < unidades) throw new Error("Stock insuficiente");

            const updated = await tx.productoSKU.update({
                where: { id_sku },
                data: { cantidad: { decrement: unidades }, fecha_editado: new Date() }
            });
            return ProductoSkuEntity.fromObject(updated);
        });
    }

    // Helper
    async findFirstByCombination(
        id_lote_tostado: string,
        gramaje: number,
        molienda: 'ENTERO' | 'MOLIDO'
    ): Promise<ProductoSkuEntity | null> {
        const row = await prisma.productoSKU.findFirst({
            where: { id_lote_tostado, gramaje, molienda, eliminado: false }
        });
        return row ? ProductoSkuEntity.fromObject(row) : null;
    }

    // DELETE (soft)
    async deleteSku(id_sku: string): Promise<ProductoSkuEntity> {
        const updated = await prisma.productoSKU.update({
            where: { id_sku },
            data: { eliminado: true, fecha_editado: new Date() }
        });
        return ProductoSkuEntity.fromObject(updated);
    }
}
