import { BoxRespuestaEntity } from "../../../entities/boxrespuesta.entity";
import { BoxRespuestaRepository } from "../../../repository/boxrespuesta.repository";

export interface GetRespuestasByUserUseCase {
    execute(id_user: string): Promise<BoxRespuestaEntity[]>;
}

export class GetRespuestasByUser implements GetRespuestasByUserUseCase {
    constructor(
        private readonly repository: BoxRespuestaRepository
    ) {}

    async execute(id_user: string): Promise<BoxRespuestaEntity[]> {
        return this.repository.getRespuestasByUser(id_user);
    }
}
