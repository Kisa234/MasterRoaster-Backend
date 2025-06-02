import { AnalisisEntity } from "../../../entities/analisis.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";

export interface GetAnalisisByLoteIdUseCase {
    execute(id:string): Promise<AnalisisEntity | null>;
}

export class GetAnalisisByLoteId implements GetAnalisisByLoteIdUseCase {
    constructor(
        private readonly analisisRepository: AnalisisRepository
    ){}

    async execute(id:string): Promise<AnalisisEntity| null> {
        return this.analisisRepository.getAnalisisByLoteId(id);
    }
}