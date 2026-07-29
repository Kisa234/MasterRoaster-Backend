import { prisma } from "../../data/postgres";
import { BolsaDataSource } from "../../domain/datasources/bolsa.datasource";
import { CreateBolsaDto } from "../../domain/dtos/bolsa/create";
import { UpdateBolsaDto } from "../../domain/dtos/bolsa/update";
import { BolsaConInventarioEntity, BolsaEntity } from "../../domain/entities/bolsa.entity";

export class BolsaDataSourceImpl implements BolsaDataSource {

    async createBolsa(id_bolsa: string, createBolsaDto: CreateBolsaDto): Promise<BolsaEntity> {
        const { id_almacen, ...bolsaData } = createBolsaDto;
        const bolsa = await prisma.bolsa.create({
            data: {
                id_bolsa,
                ...bolsaData,
            }
        });
        return BolsaEntity.fromObject(bolsa);
    }

    async countBolsasByLoteTostadoId(id_lote_tostado: string): Promise<number> {
        return prisma.bolsa.count({
            where: { id_lote_tostado }
        });
    }

    async getBolsaById(id: string): Promise<BolsaEntity | null> {
        const bolsa = await prisma.bolsa.findUnique({
            where: { id_bolsa: id }
        });
        if (!bolsa) return null;
        return BolsaEntity.fromObject(bolsa);
    }

    async updateBolsa(id: string, updateBolsaDto: UpdateBolsaDto): Promise<BolsaEntity> {
        const updated = await prisma.bolsa.update({
            where: { id_bolsa: id },
            data: { ...updateBolsaDto.values }
        });
        return BolsaEntity.fromObject(updated);
    }

    async deleteBolsa(id: string): Promise<BolsaEntity> {
        const deleted = await prisma.bolsa.update({
            where: { id_bolsa: id },
            data: { eliminado: true }
        });
        return BolsaEntity.fromObject(deleted);
    }

    async getBolsas(): Promise<BolsaEntity[]> {
        const bolsas = await prisma.bolsa.findMany({
            where: { eliminado: false }
        });
        return bolsas.map(b => BolsaEntity.fromObject(b));
    }

    async getBolsasByPedidoId(id_pedido: string): Promise<BolsaEntity[]> {
        const bolsas = await prisma.bolsa.findMany({
            where: { id_pedido, eliminado: false }
        });
        return bolsas.map(b => BolsaEntity.fromObject(b));
    }

    async getBolsasByLoteTostadoId(id_lote_tostado: string): Promise<BolsaEntity[]> {
        const bolsas = await prisma.bolsa.findMany({
            where: { id_lote_tostado, eliminado: false }
        });
        return bolsas.map(b => BolsaEntity.fromObject(b));
    }

    async getBolsasConInventario(incluirEliminados: boolean = false): Promise<BolsaConInventarioEntity[]> {
        const bolsas = await prisma.bolsa.findMany({
            where: incluirEliminados ? {} : { eliminado: false },
            include: {
                inventarios: {
                    include: { almacen: true }
                }
            }
        });
        return bolsas.map(b => BolsaConInventarioEntity.fromObject(b));
    }

    async getBolsaConInventarioById(id: string): Promise<BolsaConInventarioEntity | null> {
        const bolsa = await prisma.bolsa.findFirst({
            where: { id_bolsa: id },
            include: {
                inventarios: {
                    include: { almacen: true }
                }
            }
        });
        if (!bolsa) return null;
        return BolsaConInventarioEntity.fromObject(bolsa);
    }
}