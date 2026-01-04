import { prisma } from "../../data/postgres";
import { CambioDataSource } from "../../domain/datasources/cambio.datasource";
import { CreateCambioDto } from "../../domain/dtos/cambio/create";
import { CambioEntity } from "../../domain/entities/cambio.entity";

export class CambioDataSourceImpl implements CambioDataSource {

    async createCambio(
        createCambioDto: CreateCambioDto
    ): Promise<CambioEntity> {

        const cambio = await prisma.cambios.create({
            data: {
                ...createCambioDto,
                created_at: new Date()
            }
        });

        return CambioEntity.fromObject(cambio);
    }

    async getCambiosByEntidad(
        entidad: string,
        id_entidad: string
    ): Promise<CambioEntity[]> {

        const cambios = await prisma.cambios.findMany({
            where: {
                entidad,
                id_entidad
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return cambios.map(c => CambioEntity.fromObject(c));
    }

    async getCambiosByUser(
        id_user: string
    ): Promise<CambioEntity[]> {

        const cambios = await prisma.cambios.findMany({
            where: {
                id_user
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return cambios.map(c => CambioEntity.fromObject(c));
    }
}
