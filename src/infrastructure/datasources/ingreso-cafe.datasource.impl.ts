import { prisma } from "../../data/postgres";
import { IngresoCafeDataSource } from "../../domain/datasources/ingreso-cafe.datasource";
import { CreateIngresoCafeDto } from "../../domain/dtos/lotes/ingreso-cafe/create";
import { IngresoCafeEntity } from "../../domain/entities/ingreso-cafe.entity";

export class IngresoCafeDataSourceImpl implements IngresoCafeDataSource {

    async createIngresoCafe(
        createIngresoCafeDto: CreateIngresoCafeDto
    ): Promise<IngresoCafeEntity> {

        const ingreso = await prisma.ingresoCafe.create({
            data: {
                ...createIngresoCafeDto,
                fecha_ingreso: new Date()
            }
        });

        return IngresoCafeEntity.fromObject(ingreso);
    }

    async getIngresoCafeById(id: string): Promise<IngresoCafeEntity | null> {
        const ingreso = await prisma.ingresoCafe.findFirst({
            where: {
                id_ingreso: id
            }
        });

        if (!ingreso) return null;
        return IngresoCafeEntity.fromObject(ingreso);
    }

    async getAllIngresosCafe(): Promise<IngresoCafeEntity[]> {
        const ingresos = await prisma.ingresoCafe.findMany({
            orderBy: {
                fecha_ingreso: 'desc'
            }
        });

        return ingresos.map(i => IngresoCafeEntity.fromObject(i));
    }

    async getIngresosByLote(id_lote: string): Promise<IngresoCafeEntity[]> {
        const ingresos = await prisma.ingresoCafe.findMany({
            where: {
                id_lote
            },
            orderBy: {
                fecha_ingreso: 'desc'
            }
        });

        return ingresos.map(i => IngresoCafeEntity.fromObject(i));
    }

    async deleteIngresoCafe(id: string): Promise<IngresoCafeEntity> {
        const ingreso = await prisma.ingresoCafe.delete({
            where: {
                id_ingreso: id
            }
        });

        return IngresoCafeEntity.fromObject(ingreso);
    }
}
