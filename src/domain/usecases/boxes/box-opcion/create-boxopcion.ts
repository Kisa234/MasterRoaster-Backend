import { CreateBoxOpcionDto } from "../../../dtos/boxes/box-opcion/create";
import { BoxOpcionEntity } from "../../../entities/boxopcion.entity";
import { BoxOpcionRepository } from "../../../repository/boxopcion.repository";

export interface CreateBoxOpcionUseCase {
    execute(data: CreateBoxOpcionDto): Promise<BoxOpcionEntity>;
}

export class CreateBoxOpcion implements CreateBoxOpcionUseCase {
    constructor(
        private readonly repository: BoxOpcionRepository
    ) {}

    async execute(data: CreateBoxOpcionDto): Promise<BoxOpcionEntity> {
        return this.repository.createBoxOpcion(data);
    }
}
