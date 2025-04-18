import { LoteTostadoEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

export interface GetLoteTostadoUseCase {
    execute(id: string): Promise<LoteTostadoEntity | null>; 
}

export class GetLoteTostado implements GetLoteTostadoUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    async execute(id: string): Promise<LoteTostadoEntity | null> {
        return this.loteTostadoRepository.getLoteTostadoById(id);
    }
}