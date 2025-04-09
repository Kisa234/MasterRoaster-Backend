import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisFisicoRepository } from "../../../repository/analisisFisico.repository";

export interface DeleteAnalisisFisicoUseCase {
    execute(id: string): Promise<AnalisisFisicoEntity | null>;
}

export class DeleteAnalisisFisico implements DeleteAnalisisFisicoUseCase {
    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository
    ) {}

    async execute(id: string): Promise<AnalisisFisicoEntity | null> {
        return this.analisisFisicoRepository.deleteAnalisisFisico(id);
    }
}
