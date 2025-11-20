import { BoxRespuestaEntity } from "../../../entities/boxrespuesta.entity";
import { BoxRespuestaRepository } from "../../../repository/boxrespuesta.repository";

export interface DeleteBoxRespuestaUseCase {
    execute(id_respuesta: string): Promise<BoxRespuestaEntity>;
}

export class DeleteBoxRespuesta implements DeleteBoxRespuestaUseCase {
    constructor(
        private readonly repository: BoxRespuestaRepository
    ) {}

    async execute(id_respuesta: string): Promise<BoxRespuestaEntity> {
        return this.repository.deleteBoxRespuesta(id_respuesta);
    }
}
