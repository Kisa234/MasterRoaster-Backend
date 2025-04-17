import { UpdateLoteTostadoDto } from "../../../dtos/lotes/lote-tostado/update";
import { LoteTostadoEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

export interface UpdateLoteTostadoUseCase {
    execute(id: string, updateLoteTostadoDto: UpdateLoteTostadoDto): Promise<LoteTostadoEntity>;
}

export class UpdateLoteTostado implements UpdateLoteTostadoUseCase {

    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    execute(id: string, updateLoteTostadoDto: UpdateLoteTostadoDto): Promise<LoteTostadoEntity> {
        return this.loteTostadoRepository.updateLoteTostado(id, updateLoteTostadoDto);
    }

}