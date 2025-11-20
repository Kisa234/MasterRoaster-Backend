import { CreateBoxOpcionDto } from "../dtos/boxes/box-opcion/create";
import { UpdateBoxOpcionDto } from "../dtos/boxes/box-opcion/update";
import { BoxOpcionEntity } from "../entities/boxopcion.entity";

export abstract class BoxOpcionDataSource {
  abstract createBoxOpcion(dto: CreateBoxOpcionDto): Promise<BoxOpcionEntity>;
  abstract getBoxOpcionById(id_opcion: string): Promise<BoxOpcionEntity | null>;
  abstract updateBoxOpcion(id_opcion: string, dto: UpdateBoxOpcionDto): Promise<BoxOpcionEntity>;
  abstract deleteBoxOpcion(id_opcion: string): Promise<BoxOpcionEntity>;
  abstract getOpcionByTemplate(id_box_template: string): Promise<BoxOpcionEntity[]>;
}
