import { UpdateAnalisisFisicoDto } from "../../../dtos/analisis/fisico/update";
import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisFisicoRepository } from "../../../repository/analisisFisico.repository";

export interface UpdateAnalisisFisicoUseCase {
    execute(id: string, updateAnalisisFisicoDto: UpdateAnalisisFisicoDto): Promise<AnalisisFisicoEntity>;
}

export class UpdateAnalisisFisico implements UpdateAnalisisFisicoUseCase {
    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository
    ){}

    async execute(id: string, updateAnalisisFisicoDto: UpdateAnalisisFisicoDto): Promise<AnalisisFisicoEntity> {
        return this.analisisFisicoRepository.updateAnalisisFisico(id, updateAnalisisFisicoDto);
    }
}