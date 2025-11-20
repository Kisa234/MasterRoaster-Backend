import { BoxRespuestaEntity } from "../../../entities/boxrespuesta.entity";
import { BoxRespuestaRepository } from "../../../repository/boxrespuesta.repository";

export interface GetBoxRespuestaUseCase {
    execute(id_respuesta: string): Promise<BoxRespuestaEntity | null>;
}

export class GetBoxRespuesta implements GetBoxRespuestaUseCase {
    constructor(
        private readonly repository: BoxRespuestaRepository
    ) {}

    async execute(id_respuesta: string): Promise<BoxRespuestaEntity | null> {
        return this.repository.getBoxRespuestaById(id_respuesta);
    }
}
