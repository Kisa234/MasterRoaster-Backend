import { CreateAnalisisRapidoDto } from "../../../dtos/analisis/rapido/create";
import { CreateLoteTostadoDto } from "../../../dtos/lotes/lote-tostado/create";
import { UpdateLoteTostadoDto } from "../../../dtos/lotes/lote-tostado/update";
import { AnalisisRapidoEntity } from "../../../entities/analisisRapido.entity";
import { AnalisisRapidoRepository } from '../../../repository/analisisRapido.repository';
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

export interface CreateAnalisisRapidoUseCase {
    execute(createAnalisisRapidoDto: CreateAnalisisRapidoDto, id_lote:string): Promise<AnalisisRapidoEntity>;
}

export class CreateAnalisisRapido implements CreateAnalisisRapidoUseCase {
    constructor(
        private readonly AnalisisRapidoRepository: AnalisisRapidoRepository,
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    async execute(createAnalisisRapidoDto: CreateAnalisisRapidoDto, id_lote_tostado:string): Promise<AnalisisRapidoEntity> {
        const ar = await this.AnalisisRapidoRepository.createAnalisisRapido(createAnalisisRapidoDto);

        const loteTostado = await this.loteTostadoRepository.getLoteTostadoById(id_lote_tostado);
        if (!loteTostado) {
            throw new Error('Lote tostado not found');
        }

        const [,dto] = UpdateLoteTostadoDto.update({
            id_analisis_rapido: ar.id_analisis_rapido
        })
        if (!dto) {
            throw new Error('Invalid Lote Tostado data');
        }
        await this.loteTostadoRepository.updateLoteTostado(id_lote_tostado, dto);

        return ar;
    }
}
