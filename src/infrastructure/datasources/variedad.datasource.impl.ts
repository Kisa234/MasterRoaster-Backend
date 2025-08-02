import { prisma } from "../../data/postgres";
import { VariedadDataSource } from "../../domain/datasources/variedad.datasource";
import { CreateVariedadDto } from "../../domain/dtos/variedades/create";
import { UpdateVariedadDto } from "../../domain/dtos/variedades/update";
import { VariedadEntity } from "../../domain/entities/variedad.entity";


export class VariedadDataSourceImpl implements VariedadDataSource {
    async createVariedad(createVariedadDto: CreateVariedadDto): Promise<VariedadEntity> {
        const variedad = await prisma.variedad.create({
            data: createVariedadDto!
        });
        return VariedadEntity.fromObject(variedad);
    }

    async updateVariedad(id: string, updateVariedadDto: UpdateVariedadDto): Promise<VariedadEntity> {
        const variedad = await prisma.variedad.update({
            where: { id_variedad: id },
            data: updateVariedadDto!
        });
        return VariedadEntity.fromObject(variedad);
    }

    async deleteVariedad(id: string): Promise<VariedadEntity> {
        const variedad = await prisma.variedad.delete({
            where: { id_variedad: id }
        });
        return VariedadEntity.fromObject(variedad);
    }

    async getAllVariedades(): Promise<VariedadEntity[]> {
        const variedades = await prisma.variedad.findMany();
        return variedades.map(variedad => VariedadEntity.fromObject(variedad));
    }

    async findByNombre(nombre: string): Promise<VariedadEntity | null> {
        const variedad = await prisma.variedad.findFirst({
            where: { nombre: nombre }
        });
        if (!variedad) return null;
        return VariedadEntity.fromObject(variedad);
    }
}