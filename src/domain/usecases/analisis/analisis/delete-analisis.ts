import { AnalisisEntity } from "../../../entities/analisis.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";

export interface DeleteAnalisisUseCase {
    execute(id: string): Promise<AnalisisEntity | null>;
}

export class DeleteAnalisis implements DeleteAnalisisUseCase {
    constructor(
        private readonly analisisRepository: AnalisisRepository
    ) {}

    async execute(id: string): Promise<AnalisisEntity | null> {
        return this.analisisRepository.deleteAnalisis(id);
    }
}
