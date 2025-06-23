
import { UpdateAnalisisSensorialDTO } from "../../../dtos/analisis/sensorial/update";
import { AnalisisSensorialEntity } from "../../../entities/analisisSensorial.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";
import { AnalisisSensorialRepository } from '../../../repository/analisisSensorial.repository';
import { LoteRepository } from "../../../repository/lote.repository";
import { MuestraRepository } from "../../../repository/muestra.repository";


export interface UpdateAnalisisSensorialUseCase {
    execute(id: string, updateAnalisisSensorialDTO: UpdateAnalisisSensorialDTO, type: string): Promise<AnalisisSensorialEntity>;
}

export class UpdateAnalisisSensorial implements UpdateAnalisisSensorialUseCase {
    constructor(
        private readonly AnalisisSensorialRepository: AnalisisSensorialRepository,
        private readonly loteRepository: LoteRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly muestraRepository: MuestraRepository
    ){}

    async execute(id: string, updateAnalisisSensorialDTO: UpdateAnalisisSensorialDTO, type: string): Promise<AnalisisSensorialEntity> {
        if (type === 'lote') {
            return this.lote(id, updateAnalisisSensorialDTO);
        } else if (type === 'muestra') {
            return this.muestra(id, updateAnalisisSensorialDTO);
        } else {
            throw new Error('Tipo de analisis no soportado');
        }
    }

    private async lote (id: string, updateAnalisisSensorialDTO: UpdateAnalisisSensorialDTO) {
        // se consigue el lote por id 
        const lote = await this.loteRepository.getLoteById(id);
        if (!lote) {
            throw new Error(`Lote with id ${id} not found`);
        }
        // se consigue el analisis del lote
        let analisis = await this.analisisRepository.getAnalisisByLoteId(id);
        if (!analisis) {
            throw new Error(`Analisis del lote con el id ${id} no encontrado`);  
        }
        // se consigue el analisis sensorial del lote
        const analisisSensorial = await this.AnalisisSensorialRepository.getAnalisisSensorialById(analisis.analisisFisico_id!);
        if (!analisisSensorial) {
            throw new Error(`Analisis fisico del lote con el id ${id} no encontrado`);
        }
        // se edita el analisis sensorial del lote
        return this.AnalisisSensorialRepository.updateAnalisisSensorial(analisisSensorial.id_analisis_sensorial, updateAnalisisSensorialDTO);
    }

    private async muestra(id: string, updateAnalisisSensorialDTO: UpdateAnalisisSensorialDTO) {
        // se consigue la muestra por id 
        const muestra = await this.muestraRepository.getMuestraById(id);
        if (!muestra) {
            throw new Error(`Muestra con id ${id} no encontrada`);
        }
        // se consigue el analisis de la muestra
        let analisis = await this.analisisRepository.getAnalisisByMuestraId(id);
        if (!analisis) {
            throw new Error(`Analisis de la muestra con el id ${id} no encontrado`);  
        }
        // se consigue el analisis sensorial de la muestra
        const analisisSensorial = await this.AnalisisSensorialRepository.getAnalisisSensorialById(analisis.analisisFisico_id!);
        if (!analisisSensorial) {
            throw new Error(`Analisis fisico de la muestra con el id ${id} no encontrado`);
        }
        // se edita el analisis sensorial de la muestra
        return this.AnalisisSensorialRepository.updateAnalisisSensorial(analisisSensorial.id_analisis_sensorial, updateAnalisisSensorialDTO);
    }
}