import { prisma } from "../../data/postgres";
import { EnvioDataSource } from "../../domain/datasources/envio.datasource";
import { UpdateEnvioDto } from "../../domain/dtos/envio/envio/update";
import { EnvioEntity, ClasificacionEnvio } from "../../domain/entities/envio.entity";
import { CreateEnvioDto } from '../../domain/dtos/envio/envio/create';

export class EnvioDataSourceImpl implements EnvioDataSource {
    async createEnvio(dto: CreateEnvioDto): Promise<EnvioEntity> {
        const newEnvio = await prisma.envio.create({
            data: dto
        })
        return EnvioEntity.fromObject(newEnvio);
    }
    async getEnvioById(id_envio: string): Promise<EnvioEntity | null> {
        const envio = await prisma.envio.findFirst({
            where: {
                id_envio: id_envio
            }
        })
        if (!envio) {
            return null;
        }
        return EnvioEntity.fromObject(envio);

    }
    async updateEnvio(id_envio: string, dto: UpdateEnvioDto): Promise<EnvioEntity> {
        await this.getEnvioById;
        const updatedEnvio = await prisma.envio.update({
            where: {
                id_envio: id_envio,
            },
            data: dto
        })
        return EnvioEntity.fromObject(updatedEnvio);
    }
    async deleteEnvio(id_envio: string): Promise<EnvioEntity> {
        await this.getEnvioById;
        const updatedEnvio = await prisma.envio.update({
            where: {
                id_envio: id_envio,
            },
            data: {
                eliminado: true
            }
        })
        return EnvioEntity.fromObject(updatedEnvio);
    }
    async getEnviosByLote(id_lote_tostado: string): Promise<EnvioEntity[]> {
        const envios = await prisma.envio.findMany({
            where: {
                id_lote_tostado: id_lote_tostado,
                eliminado: false
            },
            orderBy: { fecha: 'desc' },
        })

        return envios.map(EnvioEntity.fromObject);
    }
    async getEnviosByCliente(id_cliente: string): Promise<EnvioEntity[]> {
        const envios = await prisma.envio.findMany({
            where: { id_cliente, eliminado: false },
            orderBy: { fecha: 'desc' },
        });
        return envios.map(EnvioEntity.fromObject);
    }
    async getEnviosByFechaRange(from: Date, to: Date): Promise<EnvioEntity[]> {
        const envios = await prisma.envio.findMany({
            where: {
                eliminado: false,
                fecha: { gte: from, lte: to },
            },
            orderBy: { fecha: 'desc' },
        });
        return envios.map(EnvioEntity.fromObject);
    }
    async getEnviosByClasificacion(clasificacion: ClasificacionEnvio, from?: Date, to?: Date): Promise<EnvioEntity[]> {
        const envios = await prisma.envio.findMany({
            where: {
                eliminado: false,
                clasificacion,                         // 'PARCIAL' | 'TOTAL'
                ...(from && to ? { fecha: { gte: from, lte: to } } : {}),
            },
            orderBy: { fecha: 'desc' },
        });
        return envios.map(EnvioEntity.fromObject);
    }

}