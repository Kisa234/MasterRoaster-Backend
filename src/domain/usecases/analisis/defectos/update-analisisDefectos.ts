import { UpdateAnalisisDefectosDto } from './../../../dtos/analisis/defectos/update';
import { CreateAnalisisDefectosDto } from "../../../dtos/analisis/defectos/create";
import { AnalisisDefectosEntity } from "../../../entities/analisisDefectos.entity";
import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisDefectosRespository } from "../../../repository/analisisDefectos.repository";
import { LoteRepository } from '../../../repository/lote.repository';
import { AnalisisRepository } from '../../../repository/analisis.repository';
import { MuestraRepository } from '../../../repository/muestra.repository';


export interface UpdateAnalisisDefectosUsecase {
    execute(id:string, dto:UpdateAnalisisDefectosDto,type:string): Promise<AnalisisDefectosEntity>;
}

export class UpdateAnalisisDefectos implements UpdateAnalisisDefectosUsecase {
    constructor(
        private readonly analisisDefectosRepository: AnalisisDefectosRespository,
        private readonly loteRepository: LoteRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly muestraRepository: MuestraRepository
    ){}

    async execute(id:string, dto:UpdateAnalisisDefectosDto,type:string): Promise<AnalisisDefectosEntity> {
        if (type === 'lote') {
            return this.lote(id, dto);
        } else if (type === 'muestra') {
            return this.muestra(id, dto);
        } else {
            throw new Error('Tipo de analisis no soportado');
        }
    }

    private async lote (id: string, dto: UpdateAnalisisDefectosDto){
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
            // se consigue el analisis defectos del lote
            const analisisDefectos = await this.analisisDefectosRepository.getAnalisisDefectosById(analisis.analisisDefectos_id!);
            if (!analisisDefectos) {
                throw new Error(`Analisis fisico del lote con el id ${id} no encontrado`);
            }
            // se edita el analisis defectos del lote
            return this.analisisDefectosRepository.updateAnalisisDefectos(analisisDefectos.id_analisis_defecto, dto);
        }
        private async muestra(id: string, dto: UpdateAnalisisDefectosDto){
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
            // se consigue el analisis defectos de la muestra
            const analisisDefectos = await this.analisisDefectosRepository.getAnalisisDefectosById(analisis.analisisDefectos_id!);
            if (!analisisDefectos) {
                throw new Error(`Analisis fisico de la muestra con el id ${id} no encontrado`);
            }
            // se edita el analisis defectos de la muestra
            return this.analisisDefectosRepository.updateAnalisisDefectos(analisisDefectos.id_analisis_defecto, dto);
        }
}