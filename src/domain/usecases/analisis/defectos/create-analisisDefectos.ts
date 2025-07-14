import { CreateAnalisisDto } from "../../../dtos/analisis/analisis/create";
import { UpdateAnalisisDto } from "../../../dtos/analisis/analisis/update";
import { CreateAnalisisDefectosDto } from "../../../dtos/analisis/defectos/create";
import { CreateLoteAnalisisDto } from "../../../dtos/lote-analisis/create";
import { UpdateLoteDto } from "../../../dtos/lotes/lote/update";
import { CreateMuestraAnalisisDto } from "../../../dtos/muestra-analisis/create";
import { UpdateMuestraDto } from "../../../dtos/muestra/update";
import { AnalisisDefectosEntity } from "../../../entities/analisisDefectos.entity";
import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";
import { AnalisisDefectosRespository } from "../../../repository/analisisDefectos.repository";
import { LoteAnalisisRepository } from "../../../repository/lote-analisis.repository";
import { LoteRepository } from "../../../repository/lote.repository";
import { MuestraAnalisisRepository } from "../../../repository/muestra-analisis.repository";
import { MuestraRepository } from "../../../repository/muestra.repository";
import { CreateAnalisis } from "../analisis/create-analisis";


export interface CreateAnalisisDefectosUsecase {
    execute(id:string,dto: CreateAnalisisDefectosDto,type:string): Promise<AnalisisDefectosEntity>;
}

export class CreateAnalisisDefectos implements CreateAnalisisDefectosUsecase {
    constructor(
        private readonly analisisDefectosRepository: AnalisisDefectosRespository,
        private readonly loteRepository: LoteRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly loteAnalisisRepository: LoteAnalisisRepository,
        private readonly muestraAnalisisRepository: MuestraAnalisisRepository,
        private readonly muestraRepository: MuestraRepository,

    ) { }

    async execute(id:string,dto: CreateAnalisisDefectosDto,type:string): Promise<AnalisisDefectosEntity> {
        if (type.toLowerCase() === 'lote') {
            return this.analisisxlote(dto, id);
        } else if (type.toLowerCase() === 'muestra') {
            return this.analisisxmuestra(dto, id);
        } else {
            throw new Error(`Tipo de análisis no soportado: ${type}`);
        }
    }


    private async analisisxlote(dto: CreateAnalisisDefectosDto, id_lote: string): Promise<AnalisisDefectosEntity> {
        // si el lote tiene analisis
        // si el analisis reporte este completo
        // se crea un nuevo analisis reporte
        // se agrega el nuevo analisis reporte al historial
        // se edita el analisis reporte al lote
        // se crea analisis defectos y se agrega a nuevo analisis reporte
        // si el analisis reporte no esta completo
        // el analisis defectos no esta agregado	
        // se crea el analisis defectos y se agrega al analisis reporte
        // el analisis defectos esta agregado	
        // manda error ('el analisis reporte ya tiene un analisis defectos agregado, y no esta completo ')
        // si el lote no tiene analisis
        // se crea un nuevo analisis reporte
        // se agrega el nuevo analisis reporte al historial
        // se agrega el analisis reporte al lote
        // se crea analisis defectos y se agrega a nuevo analisis reporte
        const lote = await this.loteRepository.getLoteById(id_lote);
        if (!lote) {
            throw new Error(`Lote with id ${id_lote} not found`);
        }
        if (!lote.id_analisis) {
            // se crea el analisis defectos
            const ad= await this.analisisDefectosRepository.createAnalisisDefectos(dto);
            // si el lote no tiene analisis, se crea un nuevo analisis
            const [e, newAnalisisDto] = CreateAnalisisDto.create({
                analisisDefectos_id: ad.id_analisis_defecto 
            });
            if (e) {
                throw new Error(`Error creating new analisis: ${e}`);
            }
            const newAnalisis = await this.analisisRepository.createAnalisis(newAnalisisDto!);
            // se crea un nuevo lote analisis historial
            const [a, newLoteAnalisis] = CreateLoteAnalisisDto.create({
                id_lote: id_lote,
                id_analisis: (await newAnalisis).id_analisis
            });
            if (a) {
                throw new Error(`Error creating new lote analisis: ${a}`);
            }
            await this.loteAnalisisRepository.create(newLoteAnalisis!);
            // se actualiza el lote con el nuevo analisis
            const [b, updateLote] = UpdateLoteDto.update({
                id_analisis: (await newAnalisis).id_analisis
            });
            if (b) {
                throw new Error(`Error updating lote with new analisis: ${b}`);
            }
            await this.loteRepository.updateLote(id_lote, updateLote!);

            return ad;

        }
        else {
            const analisis = await this.analisisRepository.getAnalisisById(lote.id_analisis);
            if (!analisis) {
                throw new Error(`Analisis with id ${analisis} not found`);
            }
            if (!analisis.analisisDefectos_id) {
                // se crea un nuevo analisis defectos
                const ad = await this.analisisDefectosRepository.createAnalisisDefectos(dto);
                // se agrega el analisis fisico al analisis reporte
                const [e, updateAnalisisDto] = UpdateAnalisisDto.update({
                    analisisDefectos_id: ad.id_analisis_defecto 
                });
                if (e) {
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                await this.analisisRepository.updateAnalisis(analisis.id_analisis, updateAnalisisDto!);
                return ad;
            }
            else if (analisis.analisisDefectos_id) {
                if (!analisis.analisisSensorial_id || !analisis.analisisFisico_id) throw new Error('El analisis reporte ya tiene un analisis fisico o/y sensorial agregado, y le falta completar el analisis defectos');
                //el reporte esta completo
                // se crea un nuevo analisis defectos
                const ad = await this.analisisDefectosRepository.createAnalisisDefectos(dto);
                // se crea un nuevo analisis reporte
                const [e, newAnalisisDto] = CreateAnalisisDto.create({
                    analisisDefectos_id: ad.id_analisis_defecto 
                });
                if (e) {
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                const newAnalisis = await this.analisisRepository.createAnalisis(newAnalisisDto!);
                // se crea un nuevo lote analisis historial
                const [a, newLoteAnalisis] = CreateLoteAnalisisDto.create({
                    id_lote: id_lote,
                    id_analisis: (await newAnalisis).id_analisis
                });
                if (a) {
                    throw new Error(`Error al crear un nuevo lote analisis: ${a}`);
                }
                await this.loteAnalisisRepository.create(newLoteAnalisis!);
                // se actualiza el lote con el nuevo analisis
                const [b, updateLote] = UpdateLoteDto.update({
                    id_analisis: (await newAnalisis).id_analisis
                });
                if (b) {
                    throw new Error(`Error al actualizar el lote con el nuevo analisis: ${b}`);
                }
                await this.loteRepository.updateLote(id_lote, updateLote!);
                return ad;
            }
            // If none of the above conditions are met, throw an error to ensure all code paths return or throw
            throw new Error('No se pudo crear el análisis físico: condiciones no satisfechas.');
        }
    }

    private async analisisxmuestra(dto: CreateAnalisisDefectosDto, id_muestra: string): Promise<AnalisisDefectosEntity> {
        // si el lote tiene analisis
        // si el analisis reporte este completo
        // se crea un nuevo analisis reporte
        // se agrega el nuevo analisis reporte al historial
        // se edita el analisis reporte al lote
        // se crea analisis fisico y se agrega a nuevo analisis reporte
        // si el analisis reporte no esta completo
        // el analisis fisico no esta agregado	
        // se crea el analisis fisico y se agrega al analisis reporte
        // el analisis fisico esta agregado	
        // manda error ('el analisis reporte ya tiene un analisis fisico agregado, y no esta completo ')
        // si el lote no tiene analisis
        // se crea un nuevo analisis reporte
        // se agrega el nuevo analisis reporte al historial
        // se agrega el analisis reporte al lote
        // se crea analisis fisico y se agrega a nuevo analisis reporte
        console.log('Creating analisis defectos for muestra with id:', id_muestra);
        console.log('DTO:', dto);
        const muestra = await this.muestraRepository.getMuestraById(id_muestra);
        if (!muestra) {
            throw new Error(`Muestra with id ${id_muestra} not found`);
        }
        
        if (!muestra.id_analisis) {
            // se crea el analisis defectos
            const ad = await this.analisisDefectosRepository.createAnalisisDefectos(dto);
            // si el lote no tiene analisis, se crea un nuevo analisis
            const [e, newAnalisisDto] = CreateAnalisisDto.create({
                analisisDefectos_id: ad.id_analisis_defecto 
            });
            if (e) {
                throw new Error(`Error creating new analisis: ${e}`);
            }
            const newAnalisis = await this.analisisRepository.createAnalisis(newAnalisisDto!);
            // se crea un nuevo lote analisis historial
            const [a, newMuestraAnalisis] = CreateMuestraAnalisisDto.create({
                id_muestra: id_muestra,
                id_analisis: (await newAnalisis).id_analisis
            });
            if (a) {
                throw new Error(`Error creating new lote analisis: ${a}`);
            }
            await this.muestraAnalisisRepository.create(newMuestraAnalisis!);
            // se actualiza el lote con el nuevo analisis
            const [b, updateMuestra] = UpdateMuestraDto.update({
                id_analisis: (await newAnalisis).id_analisis
            });
            if (b) {
                throw new Error(`Error updating lote with new analisis: ${b}`);
            }
            await this.muestraRepository.updateMuestra(id_muestra, updateMuestra!);

            return ad;

        }
        else {
            const analisis = await this.analisisRepository.getAnalisisById(muestra.id_analisis);
            if (!analisis) {
                throw new Error(`Analisis with id ${analisis} not found`);
            }
            if (!analisis.analisisDefectos_id) {
                // se crea un nuevo analisis defectos
                const ad = await this.analisisDefectosRepository.createAnalisisDefectos(dto);
                // se agrega el analisis fisico al analisis reporte
                const [e, updateAnalisisDto] = UpdateAnalisisDto.update({
                    analisisDefectos_id: ad.id_analisis_defecto 
                });
                if (e) {
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                await this.analisisRepository.updateAnalisis(analisis.id_analisis, updateAnalisisDto!);
                return ad;
            }
            else if (analisis.analisisDefectos_id) {
                if (!analisis.analisisSensorial_id || !analisis.analisisSensorial_id) throw new Error('El analisis reporte ya tiene un analisis fisico o/y sensorial agregado , y le falta completar el analisis defectos');
                //el reporte esta completo
                // se crea un nuevo analisis fisico
                const ad = await this.analisisDefectosRepository.createAnalisisDefectos(dto);
                // se crea un nuevo analisis reporte
                const [e, newAnalisisDto] = CreateAnalisisDto.create({
                    analisisDefectos_id: ad.id_analisis_defecto 
                });
                if (e) {
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                const newAnalisis = await this.analisisRepository.createAnalisis(newAnalisisDto!);
                // se crea un nuevo lote analisis historial
                const [a, newMuestraAnalisis] = CreateMuestraAnalisisDto.create({
                    id_muestra: id_muestra,
                    id_analisis: (await newAnalisis).id_analisis
                });
                if (a) {
                    throw new Error(`Error al crear un nuevo lote analisis: ${a}`);
                }
                await this.muestraAnalisisRepository.create(newMuestraAnalisis!);
                // se actualiza el lote con el nuevo analisis
                const [b, updateMuestra] = UpdateMuestraDto.update({
                    id_analisis: (await newAnalisis).id_analisis
                });
                if (b) {
                    throw new Error(`Error al actualizar el lote con el nuevo analisis: ${b}`);
                }
                await this.muestraRepository.updateMuestra(id_muestra, updateMuestra!);
                return ad;
            }
            // If none of the above conditions are met, throw an error to ensure all code paths return or throw
            throw new Error('No se pudo crear el análisis físico: condiciones no satisfechas.');
        }
    }


}