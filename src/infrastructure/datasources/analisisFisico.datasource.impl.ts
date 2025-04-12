import { prisma } from "../../data/postgres";
import { AnalisisFisicoDataSource } from "../../domain/datasources/analisisFisico.datasource";
import { CreateAnalisisFisicoDto } from "../../domain/dtos/analisis/fisico/create";
import { UpdateAnalisisFisicoDto } from "../../domain/dtos/analisis/fisico/update";
import { AnalisisFisicoEntity } from "../../domain/entities/analisisFisico.entity";


export  class AnalisisFisicoDataSourceImpl implements AnalisisFisicoDataSource {
    async createAnalisisFisico(createAnalisisFisicoDto: CreateAnalisisFisicoDto): Promise<AnalisisFisicoEntity> {
        const newAnalisisFisico = await prisma.analisisFisico.create({
            data: createAnalisisFisicoDto!
        });
        return AnalisisFisicoEntity.fromObject(newAnalisisFisico);
    }
    async getAnalisisFisicoById(id: string): Promise<AnalisisFisicoEntity | null> {
        const analisisFisico = await prisma.analisisFisico.findUnique({
            where:
            {
                id_analisis_fisico: id
            }
        });
        if (!analisisFisico) return null;
        return AnalisisFisicoEntity.fromObject(analisisFisico);
    }
    async updateAnalisisFisico(id: string, updateAnalisisFisicoDto: UpdateAnalisisFisicoDto): Promise<AnalisisFisicoEntity> {
        const analisis = this.getAnalisisFisicoById(id);
        const updateAnalisisFisico = await prisma.analisisFisico.update({
            where: {
                id_analisis_fisico: id
            },
            data: updateAnalisisFisicoDto!
        });
        return AnalisisFisicoEntity.fromObject(updateAnalisisFisico);
    }

    async deleteAnalisisFisico(id: string): Promise<AnalisisFisicoEntity> {
        const analisis = this.getAnalisisFisicoById(id);
        const deleteAnalisisFisico = await prisma.analisisFisico.update({
            where: {
                id_analisis_fisico: id
            },
            data: {
                eliminado: true
            }
        });
        return AnalisisFisicoEntity.fromObject(deleteAnalisisFisico);
    }

    async getAllAnalisisFisico(): Promise<AnalisisFisicoEntity[]> {
        const analisisFisico = await prisma.analisisFisico.findMany(
            {
                where: {
                    eliminado: false
                }
            }
        );
        return analisisFisico.map((analisis) => AnalisisFisicoEntity.fromObject(analisis));
    }
    
    

  }