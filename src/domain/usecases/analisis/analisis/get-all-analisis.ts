import { AnalisisEntity } from "../../../entities/analisis.entity";
import { AnalisisRepository } from '../../../repository/analisis.repository';


export interface GetAllAnalisisUseCase {
    execute(): Promise<AnalisisEntity[] | null>;
}

export class GetAllAnalisis implements GetAllAnalisisUseCase {
    constructor(
        private readonly analisisRepository: AnalisisRepository
    ){}

    async execute(): Promise<AnalisisEntity[] | null> {
        return this.analisisRepository.getAllAnalisis();
    }
}