
import { UpdateAnalisisSensorialDTO } from "../../../dtos/analisis/sensorial/update";
import { AnalisisSensorialEntity } from "../../../entities/analisisSensorial.entity";
import { AnalisisSensorialRepository } from '../../../repository/analisisSensorial.repository';


export interface UpdateAnalisisSensorialUseCase {
    execute(id: string, updateAnalisisSensorialDTO: UpdateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity>;
}

export class UpdateAnalisisSensorial implements UpdateAnalisisSensorialUseCase {
    constructor(
        private readonly AnalisisSensorialRepository: AnalisisSensorialRepository
    ){}

    async execute(id: string, updateAnalisisSensorialDTO: UpdateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity> {
        return this.AnalisisSensorialRepository.updateAnalisisSensorial(id, updateAnalisisSensorialDTO);
    }
}