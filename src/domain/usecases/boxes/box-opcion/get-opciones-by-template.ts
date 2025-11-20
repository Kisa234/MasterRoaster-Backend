import { BoxOpcionEntity } from "../../../entities/boxopcion.entity";
import { BoxOpcionRepository } from "../../../repository/boxopcion.repository";

export interface GetOpcionesByTemplateUseCase {
    execute(id_box_template: string): Promise<BoxOpcionEntity[]>;
}

export class GetOpcionesByTemplate implements GetOpcionesByTemplateUseCase {
    constructor(
        private readonly repository: BoxOpcionRepository
    ) {}

    async execute(id_box_template: string): Promise<BoxOpcionEntity[]> {
        return this.repository.getOpcionByTemplate(id_box_template);
    }
}
