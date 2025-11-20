import { BoxOpcionEntity } from "../../../entities/boxopcion.entity";
import { BoxOpcionRepository } from "../../../repository/boxopcion.repository";

export interface DeleteBoxOpcionUseCase {
    execute(id_opcion: string): Promise<BoxOpcionEntity>;
}

export class DeleteBoxOpcion implements DeleteBoxOpcionUseCase {
    constructor(
        private readonly repository: BoxOpcionRepository
    ) {}

    async execute(id_opcion: string): Promise<BoxOpcionEntity> {
        return this.repository.deleteBoxOpcion(id_opcion);
    }
}
