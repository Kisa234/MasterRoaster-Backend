
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";



export interface GetLotesUseCase {
    execute(): Promise<LoteEntity[]>;
}

export class GetLotes implements GetLotesUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute(): Promise<LoteEntity[]> {
        return this.loteRepository.getLotes();
    }
}