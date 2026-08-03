import { prisma } from "../../data/postgres";
import { PaqueteDataSource } from "../../domain/datasources/paquete.datasource";
import { CreatePaqueteDto } from "../../domain/dtos/paquete/create";
import { PaqueteEntity, PaqueteConItemsEntity } from "../../domain/entities/paquete.entity";

export class PaqueteDataSourceImpl implements PaqueteDataSource {

    async create(dto: CreatePaqueteDto): Promise<PaqueteEntity> {
        const paquete = await prisma.paquete.create({
            data: {
                id_cliente: dto.id_cliente,
                creado_por_id: dto.creado_por_id,
                id_pedido_origen: dto.id_pedido_origen,
                comentario: dto.comentario,
            },
        });
        return PaqueteEntity.fromObject(paquete);
    }

    async getById(id_paquete: string): Promise<PaqueteEntity | null> {
        const paquete = await prisma.paquete.findUnique({ where: { id_paquete } });
        if (!paquete) return null;
        return PaqueteEntity.fromObject(paquete);
    }

    async getByIdConItems(id_paquete: string): Promise<PaqueteConItemsEntity | null> {
        const paquete = await prisma.paquete.findUnique({
            where: { id_paquete },
            include: { items: true }, // 👈 debe coincidir con el destructuring en PaqueteConItemsEntity.fromObject
        });
        if (!paquete) return null;
        return PaqueteConItemsEntity.fromObject(paquete);
    }

    async getAll(incluirEliminados: boolean = false): Promise<PaqueteEntity[]> {
        const paquetes = await prisma.paquete.findMany({
            where: incluirEliminados ? {} : { eliminado: false },
            orderBy: { fecha_registro: 'desc' },
        });
        return paquetes.map(PaqueteEntity.fromObject);
    }

    async actualizarEstado(id_paquete: string, estado: string, extra: { [key: string]: any } = {}): Promise<PaqueteEntity> {
        const paquete = await prisma.paquete.update({
            where: { id_paquete },
            data: { estado: estado as any, ...extra },
        });
        return PaqueteEntity.fromObject(paquete);
    }
}
