import { AnalisisRapidoEntity } from "../../../entities/analisisRapido.entity";
import { AnalisisRapidoRepository } from '../../../repository/analisisRapido.repository';


export interface GetAnalisisRapidoUseCase {
    execute(id: string): Promise<AnalisisRapidoEntity | null>;
}

export class GetAnalisisRapido implements GetAnalisisRapidoUseCase {
    constructor(
        private readonly AnalisisRapidoRepository: AnalisisRapidoRepository
    ){}

    async execute(id: string): Promise<AnalisisRapidoEntity | null> {
        return this.AnalisisRapidoRepository.getAnalisisRapidoById(id);
    }
}