import { prisma } from "../../data/postgres";
import { BoxRespuestaDataSource } from "../../domain/datasources/boxrespuesta.datasource";
import { CreateBoxRespuestaDto } from "../../domain/dtos/boxes/box-respuesta/create";
import { UpdateBoxRespuestaDto } from "../../domain/dtos/boxes/box-respuesta/update";
import { BoxRespuestaEntity } from "../../domain/entities/boxrespuesta.entity";

export class BoxRespuestaDataSourceImpl implements BoxRespuestaDataSource {

    async createBoxRespuesta(dto: CreateBoxRespuestaDto): Promise<BoxRespuestaEntity> {
        const newRespuesta = await prisma.boxRespuesta.create({
            data: dto
        });
        return BoxRespuestaEntity.fromObject(newRespuesta);
    }

    async getBoxRespuestaById(id_respuesta: string): Promise<BoxRespuestaEntity | null> {
        const respuesta = await prisma.boxRespuesta.findFirst({
            where: { id_respuesta }
        });
        return respuesta ? BoxRespuestaEntity.fromObject(respuesta) : null;
    }

    async updateBoxRespuesta(id_respuesta: string, dto: UpdateBoxRespuestaDto): Promise<BoxRespuestaEntity> {
        const updated = await prisma.boxRespuesta.update({
            where: { id_respuesta },
            data: dto.values
        });
        return BoxRespuestaEntity.fromObject(updated);
    }

    async deleteBoxRespuesta(id_respuesta: string): Promise<BoxRespuestaEntity> {
        const deleted = await prisma.boxRespuesta.delete({
            where: { id_respuesta }
        });
        return BoxRespuestaEntity.fromObject(deleted);
    }

    async getRespuestasByTemplate(id_box_template: string): Promise<BoxRespuestaEntity[]> {
        const respuestas = await prisma.boxRespuesta.findMany({
            where: { id_box_template }
        });
        return respuestas.map(BoxRespuestaEntity.fromObject);
    }

    async getRespuestasByUser(id_user: string): Promise<BoxRespuestaEntity[]> {
        const respuestas = await prisma.boxRespuesta.findMany({
            where: { id_user },
            orderBy: { fecha_registro: "desc" }
        });
        return respuestas.map(BoxRespuestaEntity.fromObject);
    }
}
