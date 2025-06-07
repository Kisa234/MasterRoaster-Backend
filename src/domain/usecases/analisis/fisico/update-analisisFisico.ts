import { UpdateAnalisisFisicoDto } from "../../../dtos/analisis/fisico/update";
import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";
import { AnalisisFisicoRepository } from "../../../repository/analisisFisico.repository";
import { LoteRepository } from "../../../repository/lote.repository";

export interface UpdateAnalisisFisicoUseCase {
    execute(id_lote: string, updateAnalisisFisicoDto: UpdateAnalisisFisicoDto): Promise<AnalisisFisicoEntity>;
}

export class UpdateAnalisisFisico implements UpdateAnalisisFisicoUseCase {
    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly analisisRepository: AnalisisRepository,
    ){}

    async execute(id_lote: string, updateAnalisisFisicoDto: UpdateAnalisisFisicoDto): Promise<AnalisisFisicoEntity> {
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
        // se consigue el analisis fisico del lote
        const analisisFisico = await this.analisisFisicoRepository.getAnalisisFisicoById(analisis.analisisFisico_id);
        if (!analisisFisico) {
            throw new Error(`Analisis fisico del lote con el id ${id_lote} no encontrado`);
        }
        // se edita el analisis fisico del lote
        return this.analisisFisicoRepository.updateAnalisisFisico(analisisFisico.id_analisis_fisico, updateAnalisisFisicoDto);
    }
}