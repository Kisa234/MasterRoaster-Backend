import { AnalisisRapidoEntity } from "../../../entities/analisisRapido.entity";
import { AnalisisRapidoRepository } from "../../../repository/analisisRapido.repository";

export interface DeleteAnalisisRapidoUseCase {
    execute(id: string): Promise<AnalisisRapidoEntity | null>;
}

export class DeleteAnalisisRapido implements DeleteAnalisisRapidoUseCase {
    constructor(
        private readonly analisisRapidoRepository: AnalisisRapidoRepository
    ) {}

    async execute(id: string): Promise<AnalisisRapidoEntity | null> {
        return this.analisisRapidoRepository.deleteAnalisisRapido(id);
    }
}
