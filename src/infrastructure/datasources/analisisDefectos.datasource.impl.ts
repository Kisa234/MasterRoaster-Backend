import { prisma } from "../../data/postgres";
import { AnalisisDefectosDataSource } from "../../domain/datasources/analisisDefectos.datasource";
import { CreateAnalisisDefectosDto } from "../../domain/dtos/analisis/defectos/create";
import { UpdateAnalisisDefectosDto } from "../../domain/dtos/analisis/defectos/update";
import { AnalisisDefectosEntity } from "../../domain/entities/analisisDefectos.entity";


export class AnalisisDefectosDataSourceImpl implements AnalisisDefectosDataSource {
    async createAnalisisDefectos(createAnalisisDefectosDto: CreateAnalisisDefectosDto): Promise<AnalisisDefectosEntity> {
        const analisis = await prisma.analisisDefectos.create({
            data: createAnalisisDefectosDto!
        })
        return AnalisisDefectosEntity.fromObject(analisis);
    }
    async getAnalisisDefectosById(id: string): Promise<AnalisisDefectosEntity | null> {
        const analisis = await prisma.analisisDefectos.findUnique({
            where: {
                id_analisis_defecto: id
            }
        });
        if (!analisis) {
            return null;
        }
        return AnalisisDefectosEntity.fromObject(analisis);
    }
    async updateAnalisisDefectos(id: string, updateAnalisisDefectosDto: UpdateAnalisisDefectosDto): Promise<AnalisisDefectosEntity> {
        const analisis = await prisma.analisisDefectos.update({
            where: {
                id_analisis_defecto: id
            },
            data: updateAnalisisDefectosDto
        })
        return AnalisisDefectosEntity.fromObject(analisis);
    }
    async deleteAnalisisDefectos(id: string): Promise<AnalisisDefectosEntity> {
        const analisis = await prisma.analisisDefectos.update({
            where: {
                id_analisis_defecto: id
            },
            data: {
                eliminado: true
            }
        })
        return AnalisisDefectosEntity.fromObject(analisis);
    }
    
}