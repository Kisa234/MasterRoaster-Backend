import { BoxTemplateEntity } from "../../../entities/boxtemplate.entity";
import { BoxOpcionRepository } from "../../../repository/boxopcion.repository";
import { BoxTemplateRepository } from "../../../repository/boxtemplate.repository";

export interface DeleteBoxTemplateUseCase {
    execute(id: string): Promise<BoxTemplateEntity>;
}

export class DeleteBoxTemplate implements DeleteBoxTemplateUseCase {
    constructor(
        private readonly boxTemplateRepository: BoxTemplateRepository,
    ) { }

    async execute(id: string): Promise<BoxTemplateEntity> {
        return this.boxTemplateRepository.deleteBoxTemplate(id);
    }
}
