import { prisma } from "../../data/postgres";
import { LoteTostadoDataSource } from "../../domain/datasources/loteTostado.datasource";
import { CreateLoteTostadoDto } from "../../domain/dtos/lotes/lote-tostado/create";
import { UpdateLoteTostadoDto } from "../../domain/dtos/lotes/lote-tostado/update";
import { LoteTostadoEntity } from "../../domain/entities/loteTostado.entity";


export class LoteTostadoDataSourceImpl implements LoteTostadoDataSource {

    async createLoteTostado(createLoteTostadoDto: CreateLoteTostadoDto): Promise<LoteTostadoEntity> {
        const loteTostado = await prisma.loteTostado.create({
            data: createLoteTostadoDto!
        });
        return LoteTostadoEntity.fromObject(loteTostado);
    }
    async getLoteTostadoById(id: string): Promise<LoteTostadoEntity | null> {
        const loteTostado = await prisma.loteTostado.findUnique({
            where: {
                id_lote_tostado: id
            }
        });
        if (!loteTostado) return null;
        return LoteTostadoEntity.fromObject(loteTostado);
    }
    async updateLoteTostado(id: string, updateLoteTostadoDto: UpdateLoteTostadoDto): Promise<LoteTostadoEntity> {
        const lote = await this.getLoteTostadoById(id);
        const updateLote = await prisma.loteTostado.update({
            where: {
                id_lote_tostado: id
            },
            data: updateLoteTostadoDto
            
        });
        return LoteTostadoEntity.fromObject(updateLote);
    }
    async deleteLoteTostado(id: string): Promise<LoteTostadoEntity> {
        const lote = await this.getLoteTostadoById(id);
        const deleteLote = await prisma.loteTostado.update({
            where: {
                id_lote_tostado: id
            },
            data:{
                eliminado: true
            }
        })
        return LoteTostadoEntity.fromObject(deleteLote);
    }
    async getLoteTostados(): Promise<LoteTostadoEntity[]> {
        const lotes = await prisma.loteTostado.findMany({
        });
        if (!lotes) return [];
        return lotes.map(lote => LoteTostadoEntity.fromObject(lote));
    }
    async getLotesTostadoByLoteId(id: string): Promise<LoteTostadoEntity[]> {
        const lote = await prisma.lote.findUnique({
            where: {
                id_lote: id
            }
        });
        if (!lote) throw new Error("Lote not found");
        
        const lotesTostados = await prisma.loteTostado.findMany({
            where: {
                id_lote: id,
                eliminado: false
            }
        });
        if (!lotesTostados) return [];
        return lotesTostados.map(lote => LoteTostadoEntity.fromObject(lote));
    }
}