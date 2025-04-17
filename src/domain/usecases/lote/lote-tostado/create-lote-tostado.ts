import { CreateLoteTostadoDto } from "../../../dtos/lotes/lote-tostado/create";
import { LoteTostadoEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

export default interface CreateLoteTostadoUseCase {
    execute(createLoteTostadoDto: CreateLoteTostadoDto): Promise<LoteTostadoEntity>;
}

export class CreateLoteTostado implements CreateLoteTostadoUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    async execute( createLoteTostadoDto: CreateLoteTostadoDto): Promise<LoteTostadoEntity> {
        return this.loteTostadoRepository.createLoteTostado(createLoteTostadoDto);
    }
}