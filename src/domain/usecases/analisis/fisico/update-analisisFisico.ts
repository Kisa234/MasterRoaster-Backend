import { UpdateAnalisisFisicoDto } from "../../../dtos/analisis/fisico/update";
import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";
import { AnalisisFisicoRepository } from "../../../repository/analisisFisico.repository";
import { LoteRepository } from "../../../repository/lote.repository";
import { MuestraRepository } from "../../../repository/muestra.repository";

export interface UpdateAnalisisFisicoUseCase {
    execute(id: string, updateAnalisisFisicoDto: UpdateAnalisisFisicoDto, type:string): Promise<AnalisisFisicoEntity>;
}

export class UpdateAnalisisFisico implements UpdateAnalisisFisicoUseCase {
    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly muestraRepository: MuestraRepository
    ){}

    async execute(id: string, updateAnalisisFisicoDto: UpdateAnalisisFisicoDto, type:string ): Promise<AnalisisFisicoEntity> {
        if (type === 'lote') {
            return this.lote(id, updateAnalisisFisicoDto);
        } else if (type === 'muestra') {
            return this.muestra(id, updateAnalisisFisicoDto);
        } else {
            throw new Error('Tipo de analisis no soportado');
        }
    }

    private async lote (id: string, updateAnalisisFisicoDto: UpdateAnalisisFisicoDto){
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
        // se consigue el analisis fisico del lote
        const analisisFisico = await this.analisisFisicoRepository.getAnalisisFisicoById(analisis.analisisFisico_id!);
        if (!analisisFisico) {
            throw new Error(`Analisis fisico del lote con el id ${id} no encontrado`);
        }
        // se edita el analisis fisico del lote
        return this.analisisFisicoRepository.updateAnalisisFisico(analisisFisico.id_analisis_fisico, updateAnalisisFisicoDto);
    }
    private async muestra(id: string, updateAnalisisFisicoDto: UpdateAnalisisFisicoDto){
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
        // se consigue el analisis fisico de la muestra
        const analisisFisico = await this.analisisFisicoRepository.getAnalisisFisicoById(analisis.analisisFisico_id!);
        if (!analisisFisico) {
            throw new Error(`Analisis fisico de la muestra con el id ${id} no encontrado`);
        }
        // se edita el analisis fisico de la muestra
        return this.analisisFisicoRepository.updateAnalisisFisico(analisisFisico.id_analisis_fisico, updateAnalisisFisicoDto);
    }
}