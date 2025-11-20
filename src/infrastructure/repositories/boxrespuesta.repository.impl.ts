import { BoxRespuestaDataSource } from "../../domain/datasources/boxrespuesta.datasource";
import { CreateBoxRespuestaDto } from "../../domain/dtos/boxes/box-respuesta/create";
import { UpdateBoxRespuestaDto } from "../../domain/dtos/boxes/box-respuesta/update";
import { BoxRespuestaEntity } from "../../domain/entities/boxrespuesta.entity";
import { BoxRespuestaRepository } from "../../domain/repository/boxrespuesta.repository";

export class BoxRespuestaRepositoryImpl implements BoxRespuestaRepository {

    constructor(
        private readonly datasource: BoxRespuestaDataSource
    ) {}

    createBoxRespuesta(dto: CreateBoxRespuestaDto): Promise<BoxRespuestaEntity> {
        return this.datasource.createBoxRespuesta(dto);
    }

    getBoxRespuestaById(id_respuesta: string): Promise<BoxRespuestaEntity | null> {
        return this.datasource.getBoxRespuestaById(id_respuesta);
    }

    updateBoxRespuesta(id_respuesta: string, dto: UpdateBoxRespuestaDto): Promise<BoxRespuestaEntity> {
        return this.datasource.updateBoxRespuesta(id_respuesta, dto);
    }

    deleteBoxRespuesta(id_respuesta: string): Promise<BoxRespuestaEntity> {
        return this.datasource.deleteBoxRespuesta(id_respuesta);
    }

    getRespuestasByTemplate(id_box_template: string): Promise<BoxRespuestaEntity[]> {
        return this.datasource.getRespuestasByTemplate(id_box_template);
    }

    getRespuestasByUser(id_user: string): Promise<BoxRespuestaEntity[]> {
        return this.datasource.getRespuestasByUser(id_user);
    }
}
