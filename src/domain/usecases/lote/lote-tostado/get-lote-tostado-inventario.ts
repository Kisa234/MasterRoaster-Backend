import { LoteTostadoRepository } from '../../../repository/loteTostado.repository';
import { LoteTostadoConInventarioEntity, LoteTostadoConLoteEntity, LoteTostadoEntity,  } from '../../../entities/loteTostado.entity';

export interface GetLoteTostadoConInventarioUseCase {
    execute(id: string): Promise<LoteTostadoConInventarioEntity>;
}

export class GetLoteTostadoConInventario implements GetLoteTostadoConInventarioUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    
    execute(id: string): Promise<LoteTostadoConInventarioEntity> {
       return  this.loteTostadoRepository.GetLoteTostadoConInventario(id);
    }

}