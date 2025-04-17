import { LoteTostadoEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

export interface GetLoteTostadoUseCase {
    execute(id: string): Promise<LoteTostadoEntity>; 
}

export class GetLoteTostado implements GetLoteTostadoUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    async execute(id: string): Promise<LoteTostadoEntity> {
        return this.loteTostadoRepository.getLoteTostadoById(id);
    }
}