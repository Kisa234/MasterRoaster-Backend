
import { UpdateAnalisisSensorialDTO } from "../../../dtos/analisis/sensorial/update";
import { AnalisisSensorialEntity } from "../../../entities/analisisSensorial.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";
import { AnalisisSensorialRepository } from '../../../repository/analisisSensorial.repository';
import { LoteRepository } from "../../../repository/lote.repository";


export interface UpdateAnalisisSensorialUseCase {
    execute(id_lote: string, updateAnalisisSensorialDTO: UpdateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity>;
}

export class UpdateAnalisisSensorial implements UpdateAnalisisSensorialUseCase {
    constructor(
        private readonly AnalisisSensorialRepository: AnalisisSensorialRepository,
        private readonly loteRepository: LoteRepository,
        private readonly analisisRepository: AnalisisRepository,
    ){}

    async execute(id_lote: string, updateAnalisisSensorialDTO: UpdateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity> {
        // se consigue el lote por id 
        const lote = await this.loteRepository.getLoteById(id_lote);
        if (!lote) {
            throw new Error(`Lote with id ${id_lote} not found`);
        }
        // se consigue el analisis del lote
        let analisis = await this.analisisRepository.getAnalisisByLoteId(id_lote);
        if (!analisis) {
            throw new Error(`Analisis del lote con el id ${id_lote} no encontrado`);  
        }
        // se consigue el analisis sensorial del lote
        const analisisSensorial = await this.AnalisisSensorialRepository.getAnalisisSensorialById(analisis.analisisFisico_id!);
        if (!analisisSensorial) {
            throw new Error(`Analisis fisico del lote con el id ${id_lote} no encontrado`);
        }
        // se edita el analisis sensorial del lote
        return this.AnalisisSensorialRepository.updateAnalisisSensorial(analisisSensorial.id_analisis_sensorial, updateAnalisisSensorialDTO);
    }
}