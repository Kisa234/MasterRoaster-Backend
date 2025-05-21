import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";



export interface GetLoteVerdesUseCase {
    execute(): Promise<LoteEntity[]>;
}

export class GetAllLotesVerdes implements GetLoteVerdesUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute(  ): Promise<LoteEntity[]> {
        return this.loteRepository.getLotesVerdes();
    }
}