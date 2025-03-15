
import { AnalisisSensorialEntity } from "../../../entities/analisisSensorial.entity";
import { AnalisisSensorialRepository } from '../../../repository/analisisSensorial.repository';



export interface GetAnalisisSensorialUseCase {
    execute(id: string): Promise<AnalisisSensorialEntity | null>;
}

export class GetAnalisisSensorial implements GetAnalisisSensorialUseCase {
    constructor(
        private readonly AnalisisSensorialRepository: AnalisisSensorialRepository
    ){}

    async execute(id: string): Promise<AnalisisSensorialEntity | null> {
        return this.AnalisisSensorialRepository.getAnalisisSensorialById(id);
    }
}

