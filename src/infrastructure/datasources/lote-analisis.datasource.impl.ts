import { prisma } from "../../data/postgres";
import { LoteAnalisisDatasource } from "../../domain/datasources/lore-analisis.datasource";
import { CreateLoteAnalisisDto } from "../../domain/dtos/lote-analisis/create";
import { LoteAnalisisEntity } from "../../domain/entities/lote-analisis";

export class LoteAnalisisDataSourceImpl implements LoteAnalisisDatasource{ 

    async create(dto: CreateLoteAnalisisDto): Promise<LoteAnalisisEntity> {
        const loteAnalisis = await prisma.lote_Analisis.create({
            data:dto
        })
        return LoteAnalisisEntity.fromObject(loteAnalisis);
    }
    async findByLote(id_lote: string): Promise<LoteAnalisisEntity[]> {
        const lotesAnalisis = await prisma.lote_Analisis.findMany({
            where: {
                id_lote: id_lote
            }
        })
        return lotesAnalisis.map(lote => {return LoteAnalisisEntity.fromObject(lote)});
    }
    async findByAnalisis(id_analisis: string): Promise<LoteAnalisisEntity[]> {
        const lotesAnalisis = await prisma.lote_Analisis.findMany({
            where: {
                id_analisis: id_analisis
            }
        });
        return lotesAnalisis.map(lote => {return LoteAnalisisEntity.fromObject(lote)});
    }

} 