import { LoteTostadoEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

export interface DeleteLoteTostadoUseCase {
    execute(id: string): Promise<LoteTostadoEntity>;
}

export class DeleteLoteTostado implements DeleteLoteTostadoUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    async execute(id: string): Promise<LoteTostadoEntity> {
        return this.loteTostadoRepository.deleteLoteTostado(id);
    }
}