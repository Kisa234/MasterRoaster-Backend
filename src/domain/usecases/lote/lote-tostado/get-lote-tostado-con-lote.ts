import { LoteTostadoRepository } from '../../../repository/loteTostado.repository';
import { LoteTostadoConLoteEntity, LoteTostadoEntity,  } from '../../../entities/loteTostado.entity';

export interface GetLotesTostadoConLoteUseCase {
    execute(): Promise<LoteTostadoConLoteEntity[]>;
}

export class GetLotesTostadoConLote implements GetLotesTostadoConLoteUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    
    execute(): Promise<LoteTostadoConLoteEntity[]> {
       return  this.loteTostadoRepository.GetLotesTostadoandLote();
    }

}