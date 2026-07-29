import { CreateBolsaDto } from "../../dtos/bolsa/create";
import { BolsaEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface CreateBolsaUseCase {
    execute(createBolsaDto: CreateBolsaDto): Promise<BolsaEntity>;
}

export class CreateBolsa implements CreateBolsaUseCase {
    constructor(
        private readonly bolsaRepository: BolsaRepository
    ) { }

    async execute(createBolsaDto: CreateBolsaDto): Promise<BolsaEntity> {
        // Regla de negocio: id_bolsa es correlativo al id_lote_tostado
        // Formato: {id_lote_tostado}-BO-{secuencial 2 dígitos}
        const count = await this.bolsaRepository.countBolsasByLoteTostadoId(
            createBolsaDto.id_lote_tostado
        );

        const siguiente = (count + 1).toString().padStart(2, '0');
        const id_bolsa = `${createBolsaDto.id_lote_tostado}-BO-${siguiente}`;

        return this.bolsaRepository.createBolsa(id_bolsa, createBolsaDto);
    }
}