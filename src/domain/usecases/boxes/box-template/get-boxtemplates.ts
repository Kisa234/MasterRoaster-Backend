import { BoxTemplateEntity } from "../../../entities/boxtemplate.entity";
import { BoxTemplateRepository } from "../../../repository/boxtemplate.repository";

export interface GetBoxTemplatesUseCase {
    execute(): Promise<BoxTemplateEntity[]>;
}

export class GetBoxTemplates implements GetBoxTemplatesUseCase {
    constructor(
        private readonly repository: BoxTemplateRepository
    ) {}

    async execute(): Promise<BoxTemplateEntity[]> {
        return this.repository.getAllBoxTemplates();
    }
}
