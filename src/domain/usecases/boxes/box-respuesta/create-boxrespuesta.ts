import { CreateBoxRespuestaDto } from "../../../dtos/boxes/box-respuesta/create";
import { BoxRespuestaEntity } from "../../../entities/boxrespuesta.entity";
import { BoxRespuestaRepository } from "../../../repository/boxrespuesta.repository";

export interface CreateBoxRespuestaUseCase {
    execute(data: CreateBoxRespuestaDto): Promise<BoxRespuestaEntity>;
}

export class CreateBoxRespuesta implements CreateBoxRespuestaUseCase {
    constructor(
        private readonly repository: BoxRespuestaRepository
    ) {}

    async execute(data: CreateBoxRespuestaDto): Promise<BoxRespuestaEntity> {
        return this.repository.createBoxRespuesta(data);
    }
}
