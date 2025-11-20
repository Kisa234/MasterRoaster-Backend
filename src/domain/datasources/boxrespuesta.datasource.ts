import { CreateBoxRespuestaDto } from "../dtos/boxes/box-respuesta/create";
import { UpdateBoxRespuestaDto } from "../dtos/boxes/box-respuesta/update";
import { BoxRespuestaEntity } from "../entities/boxrespuesta.entity";

export abstract class BoxRespuestaDataSource {
  abstract createBoxRespuesta(dto: CreateBoxRespuestaDto): Promise<BoxRespuestaEntity>;
  abstract getBoxRespuestaById(id_respuesta: string): Promise<BoxRespuestaEntity | null>;
  abstract updateBoxRespuesta(id_respuesta: string, dto: UpdateBoxRespuestaDto): Promise<BoxRespuestaEntity>;
  abstract deleteBoxRespuesta(id_respuesta: string): Promise<BoxRespuestaEntity>;
  abstract getRespuestasByTemplate(id_box_template: string): Promise<BoxRespuestaEntity[]>;
  abstract getRespuestasByUser(id_user: string): Promise<BoxRespuestaEntity[]>;
}
