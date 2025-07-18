import { MuestraDataSource } from "../../domain/datasources/muestra.datasource";
import { MuestraEntity } from "../../domain/entities/muestra.entity";
import { prisma } from "../../data/postgres";
import { UpdateMuestraDto } from '../../domain/dtos/muestra/update';
import { CreateMuestraDto } from "../../domain/dtos/muestra/create";


export class MuestraDataSourceImpl implements MuestraDataSource {

    async createMuestra(createMuestraDto:CreateMuestraDto): Promise<MuestraEntity> {
        const newMuestra = await prisma.muestra.create({
            data: createMuestraDto!
        });
        return MuestraEntity.fromObject(newMuestra);

    }
    
    async getMuestraById(id: string): Promise<MuestraEntity | null> {
        const muestra = await prisma.muestra.findFirst({
            where: {
                id_muestra: id,
                eliminado: false
            }
        });
        if (!muestra) return null;
        return MuestraEntity.fromObject(muestra);
    }
    async updateMuestra(id: string, updateMuestraDto:UpdateMuestraDto): Promise<MuestraEntity> {
        const muestra = await this.getMuestraById(id);
        const updateMuestra = await prisma.muestra.update({
            where: {
                id_muestra: id
            },
            data: updateMuestraDto.values
        });
        return MuestraEntity.fromObject(updateMuestra);
    }
    async deleteMuestra(id: string): Promise<MuestraEntity> {
        const muestra = await this.getMuestraById(id);
        const muestraDeleted  = await prisma.muestra.update({
            where: {
                id_muestra: id
            },
            data: {
                eliminado: true
            }
        });
        return MuestraEntity.fromObject(muestraDeleted);
    }

    async getMuestras(): Promise<MuestraEntity[]> {
        const muestras = await prisma.muestra.findMany({
            where: {
                eliminado: false
            }
        });
        return muestras.map(muestra => MuestraEntity.fromObject(muestra));
    }

    async getAllMuestras(): Promise<MuestraEntity[]> {
        const muestras = await prisma.muestra.findMany();
        return muestras.map(muestra => MuestraEntity.fromObject(muestra));
    }
    
    
}