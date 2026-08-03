import { prisma } from "../../data/postgres";
import { EnvioDataSource } from "../../domain/datasources/envio.datasource";
import { CreateEnvioDto } from "../../domain/dtos/envio/create";
import { ProgramarEnvioDto } from "../../domain/dtos/envio/programar";
import { DespacharEnvioDto } from "../../domain/dtos/envio/despachar";
import { ConfirmarEntregaEnvioDto } from "../../domain/dtos/envio/confirmar-entrega";
import { CancelarEnvioDto } from "../../domain/dtos/envio/cancelar";
import { RegistrarDevolucionEnvioDto } from "../../domain/dtos/envio/registrar-devolucion";
import { EnvioEntity, EnvioConDetalleEntity } from "../../domain/entities/envio.entity";

export class EnvioDataSourceImpl implements EnvioDataSource {

    async create(dto: CreateEnvioDto, numero_correlativo: string): Promise<EnvioEntity> {
        const envio = await prisma.envio.create({
            data: {
                numero_correlativo,
                id_paquete: dto.id_paquete,
                registrado_por_id: dto.registrado_por_id,
                id_transportista: dto.id_transportista,
                peso_total_kg: dto.peso_total_kg,
                alto_cm: dto.alto_cm,
                ancho_cm: dto.ancho_cm,
                largo_cm: dto.largo_cm,
                costo_envio: dto.costo_envio,
                quien_paga: dto.quien_paga as any,
                fecha_programada: dto.fecha_programada,
                estado: dto.fecha_programada && dto.id_transportista ? 'PROGRAMADO' : 'PENDIENTE',
            },
        });
        return EnvioEntity.fromObject(envio);
    }

    async getById(id_envio: string): Promise<EnvioEntity | null> {
        const envio = await prisma.envio.findUnique({ where: { id_envio } });
        if (!envio) return null;
        return EnvioEntity.fromObject(envio);
    }

    async getByIdConDetalle(id_envio: string): Promise<EnvioConDetalleEntity | null> {
        const envio = await prisma.envio.findUnique({
            where: { id_envio },
            include: {
                paquete: { include: { items: true } }, // 👈 debe coincidir con EnvioConDetalleEntity.fromObject
                direccion: true,
                transportista: true,
            },
        });
        if (!envio) return null;
        return EnvioConDetalleEntity.fromObject(envio);
    }

    async getAll(estado?: string): Promise<EnvioEntity[]> {
        const envios = await prisma.envio.findMany({
            where: { eliminado: false, ...(estado ? { estado: estado as any } : {}) },
            orderBy: { fecha_registro: 'desc' },
        });
        return envios.map(EnvioEntity.fromObject);
    }

    async countTotal(): Promise<number> {
        return prisma.envio.count();
    }

    async programar(id_envio: string, dto: ProgramarEnvioDto): Promise<EnvioEntity> {
        const envio = await prisma.envio.update({
            where: { id_envio },
            data: {
                fecha_programada: dto.fecha_programada,
                id_transportista: dto.id_transportista,
                estado: 'PROGRAMADO',
            },
        });
        return EnvioEntity.fromObject(envio);
    }

    async despachar(id_envio: string, dto: DespacharEnvioDto): Promise<EnvioEntity> {
        const envio = await prisma.envio.update({
            where: { id_envio },
            data: {
                estado: 'DESPACHADO',
                despachado_por_id: dto.despachado_por_id,
                fecha_despacho_real: dto.fecha_despacho_real,
                numero_tracking: dto.numero_tracking,
            },
        });
        return EnvioEntity.fromObject(envio);
    }

    async confirmarEntrega(id_envio: string, dto: ConfirmarEntregaEnvioDto): Promise<EnvioEntity> {
        const envio = await prisma.envio.update({
            where: { id_envio },
            data: {
                estado: 'ENTREGADO',
                entregado_por_id: dto.entregado_por_id,
                fecha_entrega_real: dto.fecha_entrega_real,
            },
        });
        return EnvioEntity.fromObject(envio);
    }

    async cancelar(id_envio: string, dto: CancelarEnvioDto): Promise<EnvioEntity> {
        const envio = await prisma.envio.update({
            where: { id_envio },
            data: {
                estado: 'CANCELADO',
                cancelado_por_id: dto.cancelado_por_id,
                comentario_cancelacion: dto.comentario_cancelacion,
            },
        });
        return EnvioEntity.fromObject(envio);
    }

    async registrarDevolucion(id_envio: string, dto: RegistrarDevolucionEnvioDto): Promise<EnvioEntity> {
        const envio = await prisma.envio.update({
            where: { id_envio },
            data: {
                estado: 'DEVUELTO',
                comentario_cancelacion: dto.comentario ?? undefined,
            },
        });
        return EnvioEntity.fromObject(envio);
    }
}
