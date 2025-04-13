import { CreateAnalisisDto } from "../../../dtos/analisis/analisis/create";
import { UpdateAnalisisDto } from '../../../dtos/analisis/analisis/update';
import { AnalisisEntity } from "../../../entities/analisis.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";


export interface UpdateAnalisisUseCase {
    execute(id:string, updateAnalisisDto: UpdateAnalisisDto): Promise<AnalisisEntity>;
}

export class UpdateAnalisis implements UpdateAnalisisUseCase {
    constructor(
        private readonly AnalisisRepository: AnalisisRepository
    ){}

    async execute(id:string, updateAnalisisDto: UpdateAnalisisDto): Promise<AnalisisEntity> {
        return this.AnalisisRepository.updateAnalisis(id,updateAnalisisDto);
    }
}