import { AnalisisSensorialEntity } from "../../../entities/analisisSensorial.entity";
import { AnalisisSensorialRepository } from "../../../repository/analisisSensorial.repository";


export interface DeleteAnalisisSensorialUseCase {
    execute(id: string): Promise<AnalisisSensorialEntity | null>;
}

export class DeleteAnalisisSensorial implements DeleteAnalisisSensorialUseCase {
    constructor(
        private readonly analisisSensorialRepository: AnalisisSensorialRepository
    ) {}

    async execute(id: string): Promise<AnalisisSensorialEntity | null> {
        return this.analisisSensorialRepository.deleteAnalisisSensorial(id);
    }
}
