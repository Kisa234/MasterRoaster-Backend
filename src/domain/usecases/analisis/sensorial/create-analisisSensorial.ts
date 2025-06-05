import { CreateAnalisisSensorialDTO } from "../../../dtos/analisis/sensorial/create";
import { AnalisisSensorialEntity } from "../../../entities/analisisSensorial.entity";
import { AnalisisSensorialRepository } from '../../../repository/analisisSensorial.repository';

export interface CreateAnalisisSensorialUseCase {
    execute(createAnalisisSensorialDTO: CreateAnalisisSensorialDTO,id_lote:string): Promise<AnalisisSensorialEntity>;
}

export class CreateAnalisisSensorial implements CreateAnalisisSensorialUseCase {
    constructor(
        private readonly AnalisisSensorialRepository: AnalisisSensorialRepository
    ){}

    async execute(createAnalisisSensorialDTO: CreateAnalisisSensorialDTO,id_lote:string): Promise<AnalisisSensorialEntity> {
        return this.AnalisisSensorialRepository.createAnalisisSensorial(createAnalisisSensorialDTO,id_lote);
    }
}

