import { prisma } from "../../data/postgres";
import { HistorialDataSource } from "../../domain/datasources/historial.datasource";
import { CreateHistorialDto } from "../../domain/dtos/historial/create";
import { HistorialEntity } from "../../domain/entities/historial.entity";

export class HistorialDataSourceImpl implements HistorialDataSource {

    async createHistorial(createLoteHistorialDto: CreateHistorialDto): Promise<HistorialEntity> {
        const historial = await prisma.historial.create({
            data: createLoteHistorialDto!
        });

        return HistorialEntity.fromObject(historial);
    }

    async getHistorialById(id: string): Promise<HistorialEntity | null> {
        const historial = await prisma.historial.findUnique({
            where: {
                id_historial: id
            }
        });
        if (!historial) return null;
        return HistorialEntity.fromObject(historial);

    }

    async getHistorialByUserId(id: string): Promise<HistorialEntity[]> {
        const historial = await prisma.historial.findMany({
            where: {
                id_user: id
            }
        });
        if (!historial) return [];

        return historial.map(historial => HistorialEntity.fromObject(historial));
    }
    
    async getHistorialByEntidadId(id: string): Promise<HistorialEntity[]> {
        const historial = await prisma.historial.findMany({
            where: {
                id_entidad: id
            }
        });
        if (!historial) return [];

        return historial.map(historial => HistorialEntity.fromObject(historial));
    }

    async getAllHistorial(): Promise<HistorialEntity[]> {
        const historial = await prisma.historial.findMany({

        });
        if (!historial) return [];
        return historial.map(historial => HistorialEntity.fromObject(historial));
    }
    
    
    
}