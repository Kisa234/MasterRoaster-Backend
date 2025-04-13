import { CreateAnalisisDto } from "../../../dtos/analisis/analisis/create";
import { UpdateAnalisisDto } from '../../../dtos/analisis/analisis/update';
import { AnalisisEntity } from "../../../entities/analisis.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";

export interface GetAnalisisUseCase {
    execute(id:string): Promise<AnalisisEntity| null>;
}

export class GetAnalisis implements GetAnalisisUseCase {
    constructor(
        private readonly AnalisisRepository: AnalisisRepository
    ){}

    async execute(id:string): Promise<AnalisisEntity | null> {
        return this.AnalisisRepository.getAnalisisById(id);
    }
}