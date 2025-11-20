import { BoxOpcionEntity } from "../../../entities/boxopcion.entity";
import { BoxOpcionRepository } from "../../../repository/boxopcion.repository";

export interface GetBoxOpcionUseCase {
    execute(id_opcion: string): Promise<BoxOpcionEntity | null>;
}

export class GetBoxOpcion implements GetBoxOpcionUseCase {
    constructor(
        private readonly repository: BoxOpcionRepository
    ) {}

    async execute(id_opcion: string): Promise<BoxOpcionEntity | null> {
        return this.repository.getBoxOpcionById(id_opcion);
    }
}
