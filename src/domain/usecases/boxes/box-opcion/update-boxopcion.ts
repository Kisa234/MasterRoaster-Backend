import { UpdateBoxOpcionDto } from "../../../dtos/boxes/box-opcion/update";
import { BoxOpcionEntity } from "../../../entities/boxopcion.entity";
import { BoxOpcionRepository } from "../../../repository/boxopcion.repository";

export interface UpdateBoxOpcionUseCase {
    execute(id_opcion: string, data: UpdateBoxOpcionDto): Promise<BoxOpcionEntity>;
}

export class UpdateBoxOpcion implements UpdateBoxOpcionUseCase {
    constructor(
        private readonly repository: BoxOpcionRepository
    ) {}

    async execute(id_opcion: string, data: UpdateBoxOpcionDto): Promise<BoxOpcionEntity> {
        return this.repository.updateBoxOpcion(id_opcion, data);
    }
}
