import { BoxTemplateEntity } from "../../../entities/boxtemplate.entity";
import { BoxTemplateRepository } from "../../../repository/boxtemplate.repository";

export interface GetActiveBoxTemplatesUseCase {
    execute(): Promise<BoxTemplateEntity | null>;
}

export class GetActiveBoxTemplatesUseCase implements GetActiveBoxTemplatesUseCase {
    constructor(
        private readonly repository: BoxTemplateRepository
    ) {}

    async execute(): Promise<BoxTemplateEntity | null   > {
        return await this.repository.getActiveBoxTemplate();
    }
}
