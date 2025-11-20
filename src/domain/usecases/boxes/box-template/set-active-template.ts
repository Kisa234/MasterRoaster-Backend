import { BoxTemplateEntity } from "../../../entities/boxtemplate.entity";
import { BoxTemplateRepository } from "../../../repository/boxtemplate.repository";

export interface SetActiveBoxTemplatesUseCase {
    execute(id_box_template:string): Promise<void>;
}

export class SetActiveBoxTemplates implements SetActiveBoxTemplatesUseCase {
    constructor(
        private readonly repository: BoxTemplateRepository
    ) {}

    async execute(id_box_template: string): Promise<void> {
        await this.repository.setActiveTemplateUseCase(id_box_template);
    }
}
