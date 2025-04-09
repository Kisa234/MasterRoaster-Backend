import { AnalisisSensorialEntity } from "../../../entities/analisisSensorial.entity";
import { AnalisisSensorialRepository } from "../../../repository/analisisSensorial.repository";


export interface GetAllAnalisisSensorialUseCase {
    execute(): Promise<AnalisisSensorialEntity[] | null>;
}

export class GetAllAnalisisSensorial implements GetAllAnalisisSensorialUseCase {
    constructor(
        private readonly analisisSensorialRepository: AnalisisSensorialRepository
    ){}

    async execute(): Promise<AnalisisSensorialEntity[] | null> {
        return this.analisisSensorialRepository.getAllAnalisisSensorial();
    }
}
