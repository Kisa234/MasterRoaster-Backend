import { LoteTostadoEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

export interface GetAllLoteTostadoUseCase {
    execute(): Promise<LoteTostadoEntity[]>;
}

export class GetAllLoteTostado implements GetAllLoteTostadoUseCase {

    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    execute(): Promise<LoteTostadoEntity[]> {
       return this.loteTostadoRepository.getLoteTostados();
    }

}