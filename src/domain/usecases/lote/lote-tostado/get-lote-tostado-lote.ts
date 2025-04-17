import { LoteEntity } from "../../../entities/lote.entity";
import { LoteTostadoRepository } from '../../../repository/loteTostado.repository';
import { LoteTostadoEntity } from '../../../entities/loteTostado.entity';

export interface GetLoteTostadoLoteByUseCase {
    execute(id: string): Promise<LoteTostadoEntity>;
}

export class GetLoteTostadoByLote implements GetLoteTostadoLoteByUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    
    execute(id: string): Promise<LoteTostadoEntity> {
       return  this.loteTostadoRepository.getLoteTostadoById(id);
    }

}