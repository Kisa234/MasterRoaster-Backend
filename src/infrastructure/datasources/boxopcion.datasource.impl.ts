import { prisma } from "../../data/postgres";
import { BoxOpcionDataSource } from "../../domain/datasources/boxopcion.datasource";
import { CreateBoxOpcionDto } from "../../domain/dtos/boxes/box-opcion/create";
import { UpdateBoxOpcionDto } from "../../domain/dtos/boxes/box-opcion/update";
import { BoxOpcionEntity } from "../../domain/entities/boxopcion.entity";

export class BoxOpcionDataSourceImpl implements BoxOpcionDataSource {

    async createBoxOpcion(dto: CreateBoxOpcionDto): Promise<BoxOpcionEntity> {
        const newOpcion = await prisma.boxOpcion.create({
            data: dto
        });
        return BoxOpcionEntity.fromObject(newOpcion);
    }

    async getBoxOpcionById(id_opcion: string): Promise<BoxOpcionEntity | null> {
        const opcion = await prisma.boxOpcion.findFirst({
            where: { id_opcion }
        });
        return opcion ? BoxOpcionEntity.fromObject(opcion) : null;
    }

    async updateBoxOpcion(id_opcion: string, dto: UpdateBoxOpcionDto): Promise<BoxOpcionEntity> {
        const updated = await prisma.boxOpcion.update({
            where: { id_opcion },
            data: dto.values
        });
        return BoxOpcionEntity.fromObject(updated);
    }

    async deleteBoxOpcion(id_opcion: string): Promise<BoxOpcionEntity> {
        const deleted = await prisma.boxOpcion.delete({
            where: { id_opcion }
        });
        return BoxOpcionEntity.fromObject(deleted);
    }

    async getOpcionByTemplate(id_box_template: string): Promise<BoxOpcionEntity[]> {
        const opciones = await prisma.boxOpcion.findMany({
            where: { id_box_template }
        });
        return opciones.map(BoxOpcionEntity.fromObject);
    }
}
