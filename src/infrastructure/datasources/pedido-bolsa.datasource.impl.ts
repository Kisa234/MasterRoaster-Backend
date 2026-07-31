import { prisma } from "../../data/postgres";
import { PedidoBolsaDataSource } from "../../domain/datasources/pedido-bolsa.datasource";
import { CreatePedidoBolsaDto } from "../../domain/dtos/pedido-bolsa/create";
import { UpdatePedidoBolsaDto } from "../../domain/dtos/pedido-bolsa/update";
import { PedidoBolsaEntity } from "../../domain/entities/pedidoBolsa.entity";

export class PedidoBolsaDataSourceImpl implements PedidoBolsaDataSource {

    async createPedidoBolsa(dto: CreatePedidoBolsaDto): Promise<PedidoBolsaEntity> {
        const item = await prisma.pedidoBolsa.create({ data: dto });
        return PedidoBolsaEntity.fromObject(item);
    }

    async updatePedidoBolsa(id: string, dto: UpdatePedidoBolsaDto): Promise<PedidoBolsaEntity> {
        const item = await prisma.pedidoBolsa.update({
            where: { id_pedido_bolsa: id },
            data: dto.values,
        });
        return PedidoBolsaEntity.fromObject(item);
    }

    async deletePedidoBolsa(id: string): Promise<PedidoBolsaEntity> {
        const item = await prisma.pedidoBolsa.delete({
            where: { id_pedido_bolsa: id }
        });
        return PedidoBolsaEntity.fromObject(item);
    }

    async getByPedido(id_pedido: string): Promise<PedidoBolsaEntity[]> {
        const items = await prisma.pedidoBolsa.findMany({
            where: { id_pedido }
        });
        return items.map(PedidoBolsaEntity.fromObject);
    }

    async getByGramaje(gramaje: number): Promise<PedidoBolsaEntity[]> {
        const items = await prisma.pedidoBolsa.findMany({
            where: { gramaje }
        });
        return items.map(PedidoBolsaEntity.fromObject);
    }

    async getByMolienda(molienda: string): Promise<PedidoBolsaEntity[]> {
        const items = await prisma.pedidoBolsa.findMany({
            where: { molienda }
        });
        return items.map(PedidoBolsaEntity.fromObject);
    }
}
