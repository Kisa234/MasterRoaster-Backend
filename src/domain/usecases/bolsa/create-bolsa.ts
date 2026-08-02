import { CreateBolsaDto } from "../../dtos/bolsa/create";
import { BolsaEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

const MOLIENDA_ABREV: Record<string, string> = {
    ENTERO: 'ENT',
    MOLIENDA_FINA: 'FIN',
    MOLIENDA_MEDIA: 'MED',
    MOLIENDA_GRUESA: 'GRU',
    NINGUNO: 'NIN',
};

export interface CreateBolsaUseCase {
    execute(createBolsaDto: CreateBolsaDto): Promise<BolsaEntity>;
}

export class CreateBolsa implements CreateBolsaUseCase {
    constructor(
        private readonly bolsaRepository: BolsaRepository
    ) { }

    async execute(createBolsaDto: CreateBolsaDto): Promise<BolsaEntity> {
        // Regla de negocio: id_bolsa es correlativo por lote tostado + combinación gramaje/molienda
        // Formato: {id_lote_tostado}-BO-{gramaje}-{molienda_abreviada}-{secuencial 2 dígitos}
        const abrev = MOLIENDA_ABREV[createBolsaDto.molienda] ?? 'OTR';

        const count = await this.bolsaRepository.countBolsasByLoteTostadoGramajeMolienda(
            createBolsaDto.id_lote_tostado,
            createBolsaDto.gramaje,
            createBolsaDto.molienda
        );

        const siguiente = (count + 1).toString().padStart(2, '0');
        const id_bolsa = `${createBolsaDto.id_lote_tostado}-BO-${createBolsaDto.gramaje}-${abrev}-${siguiente}`;

        return this.bolsaRepository.createBolsa(id_bolsa, createBolsaDto);
    }
}