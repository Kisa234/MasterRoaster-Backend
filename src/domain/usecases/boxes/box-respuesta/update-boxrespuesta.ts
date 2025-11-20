import { UpdateBoxRespuestaDto } from "../../../dtos/boxes/box-respuesta/update";
import { BoxRespuestaEntity } from "../../../entities/boxrespuesta.entity";
import { BoxRespuestaRepository } from "../../../repository/boxrespuesta.repository";

export interface UpdateBoxRespuestaUseCase {
    execute(id_respuesta: string, data: UpdateBoxRespuestaDto): Promise<BoxRespuestaEntity>;
}

export class UpdateBoxRespuesta implements UpdateBoxRespuestaUseCase {
    constructor(
        private readonly repository: BoxRespuestaRepository
    ) {}

    async execute(id_respuesta: string, data: UpdateBoxRespuestaDto): Promise<BoxRespuestaEntity> {
        return this.repository.updateBoxRespuesta(id_respuesta, data);
    }
}
