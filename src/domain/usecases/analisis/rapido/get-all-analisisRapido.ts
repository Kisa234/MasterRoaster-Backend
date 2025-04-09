import { AnalisisRapidoEntity } from "../../../entities/analisisRapido.entity";
import { AnalisisRapidoRepository } from '../../../repository/analisisRapido.repository';

export interface GetAllAnalisisRapidoUseCase {
    execute(): Promise<AnalisisRapidoEntity[] | null>;
}

export class GetAllAnalisisRapido implements GetAllAnalisisRapidoUseCase {
    constructor(
        private readonly analisisRapidoRepository: AnalisisRapidoRepository
    ){}

    async execute(): Promise<AnalisisRapidoEntity[] | null> {
        return this.analisisRapidoRepository.getAllAnalisisRapido();
    }
}
