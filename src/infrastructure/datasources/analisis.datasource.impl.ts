import { prisma } from "../../data/postgres";
import { AnalisisDataSource } from "../../domain/datasources/analisis.datasource";
import { CreateAnalisisDto } from "../../domain/dtos/analisis/analisis/create";
import { UpdateAnalisisDto } from "../../domain/dtos/analisis/analisis/update";
import { AnalisisEntity } from "../../domain/entities/analisis.entity";


export  class AnalisisDataSourceImpl implements AnalisisDataSource {
    async createAnalisis(createAnalisisDto: CreateAnalisisDto): Promise<AnalisisEntity> {
        const newAnalisis = await prisma.analisis.create({
            data: createAnalisisDto!
        });
        return AnalisisEntity.fromObject(newAnalisis);
    }
    async getAnalisisById(id: string): Promise<AnalisisEntity|null> {
        const analisis = await prisma.analisis.findUnique({
            where:
            {
               id_analisis : id
            }
        });
        if (!analisis) throw new Error("Analisis not found");
        return AnalisisEntity.fromObject(analisis);
    }
    async updateAnalisis(id: string, updateAnalisisDto: UpdateAnalisisDto): Promise<AnalisisEntity> {
        const analisis = await this.getAnalisisById(id);
        const updateAnalisis = await prisma.analisis.update({
            where: {
                id_analisis: id
            },
            data: updateAnalisisDto!
        });
        return AnalisisEntity.fromObject(updateAnalisis);
    }

    async deleteAnalisis(id: string): Promise<AnalisisEntity> {
        const analisis = await this.getAnalisisById(id);
        const deleteAnalisis = await prisma.analisis.delete({
            where: {
                id_analisis: id
            }
        });
        return AnalisisEntity.fromObject(deleteAnalisis);
    }

    async getAllAnalisis(): Promise<AnalisisEntity[]> {
        const analisis = await prisma.analisis.findMany();
        return analisis.map((analisis) => AnalisisEntity.fromObject(analisis));
    }
    
    
    
}