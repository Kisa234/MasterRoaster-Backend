import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisFisicoRepository } from "../../../repository/analisisFisico.repository";

export interface GetAnalisisFisicoUseCase {
    execute(id: string): Promise<AnalisisFisicoEntity | null>;
}

export class GetAnalisisFisico implements GetAnalisisFisicoUseCase {
    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository
    ){}

    async execute(id: string): Promise<AnalisisFisicoEntity | null> {
        return this.analisisFisicoRepository.getAnalisisFisicoById(id);
    }
}
