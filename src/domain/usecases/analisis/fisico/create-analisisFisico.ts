import { CreateAnalisisFisicoDto } from "../../../dtos/analisis/fisico/create";
import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisFisicoRepository } from "../../../repository/analisisFisico.repository";
import { LoteRepository } from '../../../repository/lote.repository';
import { AnalisisRepository } from '../../../repository/analisis.repository';
import { CreateAnalisisDto } from "../../../dtos/analisis/analisis/create";
import { CreateLoteAnalisisDto } from "../../../dtos/lote-analisis/create";
import { UpdateLoteDto } from "../../../dtos/lotes/lote/update";
import { LoteAnalisisRepository } from "../../../repository/lote-analisis.repository";
import { UpdateAnalisisDto } from "../../../dtos/analisis/analisis/update";
import { CreateMuestraAnalisisDto } from "../../../dtos/muestra-analisis/create";
import { MuestraAnalisisRepository } from "../../../repository/muestra-analisis.repository";
import { MuestraRepository } from "../../../repository/muestra.repository";
import { UpdateMuestra } from "../../muestra/update-muestra";
import { UpdateMuestraDto } from "../../../dtos/muestra/update";


export interface CreateAnalisisFisicoUseCase {
    execute(createAnalisisFisicoDto: CreateAnalisisFisicoDto,id:string,type:string): Promise<AnalisisFisicoEntity>;
}

export class CreateAnalisisFisico implements CreateAnalisisFisicoUseCase {
    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly loteAnalisisRepository: LoteAnalisisRepository,
        private readonly muestraAnalisisRepository: MuestraAnalisisRepository,
        private readonly muestraRepository: MuestraRepository
    ){}

    async execute(createAnalisisFisicoDto: CreateAnalisisFisicoDto,id:string, type:string): Promise<AnalisisFisicoEntity> {
        if (type === 'lote') {
            return this.analisisxlote(createAnalisisFisicoDto, id);
        } else if (type === 'muestra') {
            return this.analisisxmuestra(createAnalisisFisicoDto, id);
        } else {
            throw new Error(`Tipo de análisis no soportado: ${type}`);
        }
    }

    private async analisisxlote(createAnalisisFisicoDto: CreateAnalisisFisicoDto, id_lote: string): Promise<AnalisisFisicoEntity> {
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
        const lote = await this.loteRepository.getLoteById(id_lote);
        if (!lote) {
            throw new Error(`Lote with id ${id_lote} not found`);
        }
        if (!lote.id_analisis) {
            // se crea el analisis fisico
            const af = await this.analisisFisicoRepository.createAnalisisFisico(createAnalisisFisicoDto); 
            // si el lote no tiene analisis, se crea un nuevo analisis
            const [e, newAnalisisDto] = CreateAnalisisDto.create({
                analisisFisico_id: af.id_analisis_fisico
            });
            if (e){
                throw new Error(`Error creating new analisis: ${e}`);
            }
            const newAnalisis = await this.analisisRepository.createAnalisis(newAnalisisDto!);
            // se crea un nuevo lote analisis historial
            const [a , newLoteAnalisis] = CreateLoteAnalisisDto.create({
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

            return af;

        }
        else{
            const analisis = await this.analisisRepository.getAnalisisById(lote.id_analisis);
            if (!analisis) {
                throw new Error(`Analisis with id ${analisis} not found`);
            }
            if (!analisis.analisisFisico_id) {
                // se crea un nuevo analisis fisico
                const af = await this.analisisFisicoRepository.createAnalisisFisico(createAnalisisFisicoDto);
                // se agrega el analisis fisico al analisis reporte\
                console.log(af);
                const [e, updateAnalisisDto] = UpdateAnalisisDto.update({
                    analisisFisico_id: (await af).id_analisis_fisico
                });
                if (e){
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                await this.analisisRepository.updateAnalisis(analisis.id_analisis, updateAnalisisDto!);
                return af;                
            }
            else if (analisis.analisisFisico_id){
                if (!analisis.analisisSensorial_id || !analisis.analisisDefectos_id) throw new Error('El analisis reporte ya tiene un analisis fisico y/o defectos agregado, y le falta completar el analisis sensorial');
                //el reporte esta completo
                // se crea un nuevo analisis fisico
                const af = await this.analisisFisicoRepository.createAnalisisFisico(createAnalisisFisicoDto);
                // se crea un nuevo analisis reporte
                const [e, newAnalisisDto] = CreateAnalisisDto.create({
                    analisisFisico_id: af.id_analisis_fisico
                });
                if (e){
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                const newAnalisis = await this.analisisRepository.createAnalisis(newAnalisisDto!);
                // se crea un nuevo lote analisis historial
                const [a , newLoteAnalisis] = CreateLoteAnalisisDto.create({
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
                return af;
            }
            // If none of the above conditions are met, throw an error to ensure all code paths return or throw
            throw new Error('No se pudo crear el análisis físico: condiciones no satisfechas.');
        }
    }

    private async analisisxmuestra(createAnalisisFisicoDto: CreateAnalisisFisicoDto, id_muestra: string): Promise<AnalisisFisicoEntity> {
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
        const muestra = await this.muestraRepository.getMuestraById(id_muestra);
        if (!muestra) {
            throw new Error(`Muestra with id ${id_muestra} not found`);
        }
        if (!muestra.id_analisis) {
            // se crea el analisis fisico
            const af = await this.analisisFisicoRepository.createAnalisisFisico(createAnalisisFisicoDto); 
            // si el lote no tiene analisis, se crea un nuevo analisis
            const [e, newAnalisisDto] = CreateAnalisisDto.create({
                analisisFisico_id: af.id_analisis_fisico
            });
            if (e) {
                throw new Error(`Error creating new analisis: ${e}`);
            }
            const newAnalisis = await this.analisisRepository.createAnalisis(newAnalisisDto!);
            // se crea un nuevo lote analisis historial
            const [a , newMuestraAnalisis] = CreateMuestraAnalisisDto.create({
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

            return af;

        }
        else{
            const analisis = await this.analisisRepository.getAnalisisById(muestra.id_analisis);
            if (!analisis) {
                throw new Error(`Analisis with id ${analisis} not found`);
            }
            if (!analisis.analisisFisico_id) {
                // se crea un nuevo analisis fisico
                const af = await this.analisisFisicoRepository.createAnalisisFisico(createAnalisisFisicoDto);
                // se agrega el analisis fisico al analisis reporte
                const [e, updateAnalisisDto] = UpdateAnalisisDto.update({
                    analisisFisico_id: af.id_analisis_fisico
                });
                if (e){
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                await this.analisisRepository.updateAnalisis(analisis.id_analisis, updateAnalisisDto!);
                return af;                
            }
            else if (analisis.analisisFisico_id){
                if (!analisis.analisisSensorial_id || !analisis.analisisDefectos_id) throw new Error('El analisis reporte ya tiene un analisis fisico y/o defectos agregado, y le falta completar el analisis sensorial');
                //el reporte esta completo
                // se crea un nuevo analisis fisico
                const af = await this.analisisFisicoRepository.createAnalisisFisico(createAnalisisFisicoDto);
                // se crea un nuevo analisis reporte
                const [e, newAnalisisDto] = CreateAnalisisDto.create({
                    analisisFisico_id: af.id_analisis_fisico
                });
                if (e){
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                const newAnalisis = await this.analisisRepository.createAnalisis(newAnalisisDto!);
                // se crea un nuevo lote analisis historial
                const [a , newMuestraAnalisis] = CreateMuestraAnalisisDto.create({
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
                return af;
            }
            // If none of the above conditions are met, throw an error to ensure all code paths return or throw
            throw new Error('No se pudo crear el análisis físico: condiciones no satisfechas.');
        }
    }
}
