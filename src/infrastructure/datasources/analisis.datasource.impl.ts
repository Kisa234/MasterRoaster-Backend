import { prisma } from "../../data/postgres";
import { AnalisisDataSource } from "../../domain/datasources/analisis.datasource";
import { CreateAnalisisDto } from "../../domain/dtos/analisis/analisis/create";
import { UpdateAnalisisDto } from "../../domain/dtos/analisis/analisis/update";
import { AnalisisEntity } from "../../domain/entities/analisis.entity";


export  class AnalisisDataSourceImpl implements AnalisisDataSource {
    async createAnalisis(createAnalisisDto: CreateAnalisisDto): Promise<AnalisisEntity> {
        const newAnalisis = prisma.analisis.create({
            data: createAnalisisDto!
        });
        return AnalisisEntity.fromObject(newAnalisis);
    }
    async getAnalisisById(id: string): Promise<AnalisisEntity | null> {
        const analisis = prisma.analisis.findUnique({
            where:
            {
               id_analisis : id
            }
        });
        if (!analisis) return null;
        return AnalisisEntity.fromObject(analisis);
    }
    async updateAnalisis(id: string, updateAnalisisDto: UpdateAnalisisDto): Promise<AnalisisEntity> {
        const analisis = this.getAnalisisById(id);
        const updateAnalisis = prisma.analisis.update({
            where: {
                id_analisis: id
            },
            data: updateAnalisisDto!
        });
        return AnalisisEntity.fromObject(updateAnalisis);
    }
    
    
}