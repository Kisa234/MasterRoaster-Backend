import { AnalisisEntity } from "../../../entities/analisis.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";

export interface GetAnalisisByMuestraIdUseCase {
    execute(id:string): Promise<AnalisisEntity | null>;
}

export class GetAnalisisByMuestraId implements GetAnalisisByMuestraIdUseCase {
    constructor(
        private readonly analisisRepository: AnalisisRepository
    ){}

    async execute(id:string): Promise<AnalisisEntity| null> {
        return this.analisisRepository.getAnalisisByMuestraId(id);
    }
}