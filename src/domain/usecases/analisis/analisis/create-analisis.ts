import { CreateAnalisisDto } from "../../../dtos/analisis/analisis/create";
import { AnalisisEntity } from "../../../entities/analisis.entity";
import { AnalisisRepository } from '../../../repository/analisis.repository';


export interface CreateAnalisisUseCase {
    execute(createAnalisisDto: CreateAnalisisDto): Promise<AnalisisEntity>;
}

export class CreateAnalisis implements CreateAnalisisUseCase {
    constructor(
        private readonly AnalisisRepository: AnalisisRepository
    ){}

    async execute(createAnalisisDto: CreateAnalisisDto): Promise<AnalisisEntity> {
        return this.AnalisisRepository.createAnalisis(createAnalisisDto);
    }
}