import { prisma } from "../../data/postgres";
import { PedidoItemDataSource } from "../../domain/datasources/pedido-item.datasource";
import { CreatePedidoItemDto } from "../../domain/dtos/pedido-item/create";
import { PedidoItemEntity } from "../../domain/entities/pedido-item.entity";

export class PedidoItemDataSourceImpl implements PedidoItemDataSource {

    async createMany(id_pedido: string, items: CreatePedidoItemDto[]): Promise<PedidoItemEntity[]> {
        // createMany de Prisma no devuelve las filas creadas, así que se crea
        // una por una (el volumen esperado por pedido es bajo, sin problema de performance).
        const creados = await Promise.all(
            items.map(item =>
                prisma.pedidoItem.create({
                    data: {
                        id_pedido,
                        entidad: item.entidad as any,
                        id_entidad: item.id_entidad,
                        cantidad: item.cantidad,
                    },
                })
            )
        );
        return creados.map(PedidoItemEntity.fromObject);
    }

    async getByPedido(id_pedido: string): Promise<PedidoItemEntity[]> {
        const items = await prisma.pedidoItem.findMany({ where: { id_pedido } });
        return items.map(PedidoItemEntity.fromObject);
    }

    async deleteByPedido(id_pedido: string): Promise<void> {
        await prisma.pedidoItem.deleteMany({ where: { id_pedido } });
    }
}
