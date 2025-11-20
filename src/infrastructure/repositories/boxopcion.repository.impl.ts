import { BoxOpcionDataSource } from "../../domain/datasources/boxopcion.datasource";
import { CreateBoxOpcionDto } from "../../domain/dtos/boxes/box-opcion/create";
import { UpdateBoxOpcionDto } from "../../domain/dtos/boxes/box-opcion/update";
import { BoxOpcionEntity } from "../../domain/entities/boxopcion.entity";
import { BoxOpcionRepository } from "../../domain/repository/boxopcion.repository";

export class BoxOpcionRepositoryImpl implements BoxOpcionRepository {

    constructor(
        private readonly datasource: BoxOpcionDataSource
    ) {}

    createBoxOpcion(dto: CreateBoxOpcionDto): Promise<BoxOpcionEntity> {
        return this.datasource.createBoxOpcion(dto);
    }

    getBoxOpcionById(id_opcion: string): Promise<BoxOpcionEntity | null> {
        return this.datasource.getBoxOpcionById(id_opcion);
    }

    updateBoxOpcion(id_opcion: string, dto: UpdateBoxOpcionDto): Promise<BoxOpcionEntity> {
        return this.datasource.updateBoxOpcion(id_opcion, dto);
    }

    deleteBoxOpcion(id_opcion: string): Promise<BoxOpcionEntity> {
        return this.datasource.deleteBoxOpcion(id_opcion);
    }

    getOpcionByTemplate(id_box_template: string): Promise<BoxOpcionEntity[]> {
        return this.datasource.getOpcionByTemplate(id_box_template);
    }
}
