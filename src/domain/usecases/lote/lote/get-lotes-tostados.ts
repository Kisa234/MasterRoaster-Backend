
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";



export interface GetLoteTostadosUseCase {
    execute(): Promise<LoteEntity[]>;
}

export class GetALLLotesTostados implements GetLoteTostadosUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute( ): Promise<LoteEntity[]> {
        return this.loteRepository.getLotesTostados();
    }
}