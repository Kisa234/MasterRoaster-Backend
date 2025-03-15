import { CreateAnalisisFisicoDto } from "../../../dtos/analisis/fisico/create";
import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisFisicoRepository } from "../../../repository/analisisFisico.repository";


export interface CreateAnalisisFisicoUseCase {
    execute(createAnalisisFisicoDto: CreateAnalisisFisicoDto): Promise<AnalisisFisicoEntity>;
}

export class CreateAnalisisFisico implements CreateAnalisisFisicoUseCase {
    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository
    ){}

    async execute(createAnalisisFisicoDto: CreateAnalisisFisicoDto): Promise<AnalisisFisicoEntity> {
        return this.analisisFisicoRepository.createAnalisisFisico(createAnalisisFisicoDto);
    }
}
