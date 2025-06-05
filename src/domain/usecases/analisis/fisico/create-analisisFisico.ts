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


export interface CreateAnalisisFisicoUseCase {
    execute(createAnalisisFisicoDto: CreateAnalisisFisicoDto,id_lote:string): Promise<AnalisisFisicoEntity>;
}

export class CreateAnalisisFisico implements CreateAnalisisFisicoUseCase {
    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,
        private readonly LoteRepository: LoteRepository,
        private readonly AnalisisRepository: AnalisisRepository,
        private readonly LoteAnalisisRepository: LoteAnalisisRepository
    ){}

    async execute(createAnalisisFisicoDto: CreateAnalisisFisicoDto,id_lote:string): Promise<AnalisisFisicoEntity> {
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

        const lote = await this.LoteRepository.getLoteById(id_lote);
        if (!lote) {
            throw new Error(`Lote with id ${id_lote} not found`);
        }
        let analisis = await this.AnalisisRepository.getAnalisisByLoteId(id_lote);
        
        if (!analisis) {
            // se crea el analisis fisico
            const af = await this.analisisFisicoRepository.createAnalisisFisico(createAnalisisFisicoDto); 
            // si el lote no tiene analisis, se crea un nuevo analisis
            const [e, newAnalisisDto] = CreateAnalisisDto.create({
                analisis_fisico_id: af.id_analisis_fisico
            });
            if (e){
                throw new Error(`Error creating new analisis: ${e}`);
            }
            const newAnalisis = await this.AnalisisRepository.createAnalisis(newAnalisisDto!);
            // se crea un nuevo lote analisis historial
            const [a , newLoteAnalisis] = CreateLoteAnalisisDto.create({
                id_lote: id_lote,
                id_analisis: (await newAnalisis).id_analisis
            });
            if (a) {
                throw new Error(`Error creating new lote analisis: ${a}`);
            }
            await this.LoteAnalisisRepository.create(newLoteAnalisis!);
            // se actualiza el lote con el nuevo analisis
            const [b, updateLote] = UpdateLoteDto.update({
                id_analisis: (await newAnalisis).id_analisis
            });
            if (b) {
                throw new Error(`Error updating lote with new analisis: ${b}`);
            }
            await this.LoteRepository.updateLote(id_lote, updateLote!);

            return af;

        }
        else{
            if (!analisis.analisisFisico_id) {
                // se crea un nuevo analisis fisico
                const af = await this.analisisFisicoRepository.createAnalisisFisico(createAnalisisFisicoDto);
                // se agrega el analisis fisico al analisis reporte
                const [e, updateAnalisisDto] = UpdateAnalisisDto.update({
                    analisis_fisico_id: af.id_analisis_fisico
                });
                if (e){
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                await this.AnalisisRepository.updateAnalisis(analisis.id_analisis, updateAnalisisDto!);
                return af;                
            }
            else if (analisis.analisisFisico_id){
                if (!analisis.analisisSensorial_id) throw new Error('El analisis reporte ya tiene un analisis fisico agregado, y le falta completar el analisis sensorial');
                //el reporte esta completo
                // se crea un nuevo analisis fisico
                const af = await this.analisisFisicoRepository.createAnalisisFisico(createAnalisisFisicoDto);
                // se crea un nuevo analisis reporte
                const [e, newAnalisisDto] = CreateAnalisisDto.create({
                    analisis_fisico_id: af.id_analisis_fisico
                });
                if (e){
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                const newAnalisis = await this.AnalisisRepository.createAnalisis(newAnalisisDto!);
                // se crea un nuevo lote analisis historial
                const [a , newLoteAnalisis] = CreateLoteAnalisisDto.create({
                    id_lote: id_lote,
                    id_analisis: (await newAnalisis).id_analisis
                });
                if (a) {
                    throw new Error(`Error al crear un nuevo lote analisis: ${a}`);
                }
                await this.LoteAnalisisRepository.create(newLoteAnalisis!);
                // se actualiza el lote con el nuevo analisis
                const [b, updateLote] = UpdateLoteDto.update({
                    id_analisis: (await newAnalisis).id_analisis
                });
                if (b) {
                    throw new Error(`Error al actualizar el lote con el nuevo analisis: ${b}`);
                }
                await this.LoteRepository.updateLote(id_lote, updateLote!);
                return af;
            }
            // If none of the above conditions are met, throw an error to ensure all code paths return or throw
            throw new Error('No se pudo crear el análisis físico: condiciones no satisfechas.');
        }
    }
}
