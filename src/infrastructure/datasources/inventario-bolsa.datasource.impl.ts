import { prisma } from "../../data/postgres";
import { InventarioBolsaDataSource } from "../../domain/datasources/inventario-bolsa";
import { CreateInventarioBolsaDto } from "../../domain/dtos/inventarios/inventario-bolsa/create";
import { UpdateInventarioBolsaDto } from "../../domain/dtos/inventarios/inventario-bolsa/update";
import { InventarioBolsaEntity } from "../../domain/entities/inventarioBolsa.entity";

export class InventarioBolsaDataSourceImpl implements InventarioBolsaDataSource {

    async createInventario(dto: CreateInventarioBolsaDto): Promise<InventarioBolsaEntity> {
        const inventario = await prisma.inventarioBolsa.create({
            data: dto
        });
        return InventarioBolsaEntity.fromObject(inventario);
    }

    async updateInventario(id_inventario: string, dto: UpdateInventarioBolsaDto): Promise<InventarioBolsaEntity> {
        const inventario = await prisma.inventarioBolsa.update({
            where: { id_inventario },
            data: dto.values,
        });
        return InventarioBolsaEntity.fromObject(inventario);
    }

    async getByBolsaAndAlmacen(id_bolsa: string, id_almacen: string): Promise<InventarioBolsaEntity | null> {
        const inventario = await prisma.inventarioBolsa.findFirst({
            where: { id_bolsa, id_almacen }
        });
        if (!inventario) return null;
        return InventarioBolsaEntity.fromObject(inventario);
    }

    async getByAlmacen(id_almacen: string): Promise<InventarioBolsaEntity[]> {
        const inventarios = await prisma.inventarioBolsa.findMany({
            where: { id_almacen },
            orderBy: { fecha_registro: 'asc' }
        });
        return inventarios.map(InventarioBolsaEntity.fromObject);
    }

    async getByBolsa(id_bolsa: string): Promise<InventarioBolsaEntity[]> {
        const inventarios = await prisma.inventarioBolsa.findMany({
            where: { id_bolsa },
            orderBy: { fecha_registro: 'asc' }
        });
        return inventarios.map(InventarioBolsaEntity.fromObject);
    }

    async getAllInventarios(): Promise<InventarioBolsaEntity[]> {
        const inventarios = await prisma.inventarioBolsa.findMany({
            orderBy: { fecha_registro: 'asc' }
        });
        return inventarios.map(InventarioBolsaEntity.fromObject);
    }
}
