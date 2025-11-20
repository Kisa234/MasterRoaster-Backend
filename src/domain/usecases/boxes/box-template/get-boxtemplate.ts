import { BoxTemplateEntity } from "../../../entities/boxtemplate.entity";
import { BoxTemplateRepository } from "../../../repository/boxtemplate.repository";

export interface GetBoxTemplateUseCase {
    execute(id: string): Promise<BoxTemplateEntity | null>;
}

export class GetBoxTemplate implements GetBoxTemplateUseCase {
    constructor(
        private readonly repository: BoxTemplateRepository
    ) {}

    async execute(id: string): Promise<BoxTemplateEntity | null> {
        return this.repository.getBoxTemplateById(id);
    }
}
