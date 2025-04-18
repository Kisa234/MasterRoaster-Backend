import { LoteEntity } from "../../../entities/lote.entity";
import { LoteTostadoRepository } from '../../../repository/loteTostado.repository';
import { LoteTostadoEntity } from '../../../entities/loteTostado.entity';

export interface GetLotesTostadoLoteByUseCase {
    execute(id: string): Promise<LoteTostadoEntity[]>;
}

export class GetLotesTostadoByLote implements GetLotesTostadoLoteByUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    
    execute(id: string): Promise<LoteTostadoEntity[]> {
       return  this.loteTostadoRepository.getLotesTostadoByLoteId(id);
    }

}