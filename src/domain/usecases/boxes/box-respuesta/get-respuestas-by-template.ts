import { BoxRespuestaEntity } from "../../../entities/boxrespuesta.entity";
import { BoxRespuestaRepository } from "../../../repository/boxrespuesta.repository";

export interface GetRespuestasByTemplateUseCase {
    execute(id_box_template: string): Promise<BoxRespuestaEntity[]>;
}

export class GetRespuestasByTemplate implements GetRespuestasByTemplateUseCase {
    constructor(
        private readonly repository: BoxRespuestaRepository
    ) {}

    async execute(id_box_template: string): Promise<BoxRespuestaEntity[]> {
        return this.repository.getRespuestasByTemplate(id_box_template);
    }
}
