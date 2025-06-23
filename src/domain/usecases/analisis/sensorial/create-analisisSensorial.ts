import { MuestraRepositoryImpl } from './../../../../infrastructure/repositories/muestra.repository.impl';
import { CreateAnalisisDto } from "../../../dtos/analisis/analisis/create";
import { UpdateAnalisisDto } from "../../../dtos/analisis/analisis/update";
import { CreateAnalisisSensorialDTO } from "../../../dtos/analisis/sensorial/create";
import { CreateLoteAnalisisDto } from "../../../dtos/lote-analisis/create";
import { UpdateLoteDto } from "../../../dtos/lotes/lote/update";
import { AnalisisSensorialEntity } from "../../../entities/analisisSensorial.entity";
import { AnalisisRepository } from "../../../repository/analisis.repository";
import { AnalisisSensorialRepository } from '../../../repository/analisisSensorial.repository';
import { LoteAnalisisRepository } from "../../../repository/lote-analisis.repository";
import { LoteRepository } from "../../../repository/lote.repository";
import { MuestraAnalisisRepository } from '../../../repository/muestra-analisis.repository';
import { CreateMuestraAnalisisDto } from '../../../dtos/muestra-analisis/create';
import { UpdateMuestra } from '../../muestra/update-muestra';
import { UpdateMuestraDto } from '../../../dtos/muestra/update';
import { MuestraRepository } from '../../../repository/muestra.repository';

export interface CreateAnalisisSensorialUseCase {
    execute(createAnalisisSensorialDTO: CreateAnalisisSensorialDTO, id: string, type: string): Promise<AnalisisSensorialEntity>;
}

export class CreateAnalisisSensorial implements CreateAnalisisSensorialUseCase {
    constructor(
        private readonly AnalisisSensorialRepository: AnalisisSensorialRepository,
        private readonly loteRepository: LoteRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly loteAnalisisRepository: LoteAnalisisRepository,
        private readonly muestraRepository: MuestraRepository,
        private readonly muestraAnalisisRepository: MuestraAnalisisRepository
    ) { }

    async execute(createAnalisisSensorialDTO: CreateAnalisisSensorialDTO, id: string, type: string): Promise<AnalisisSensorialEntity> {
        if (type === 'lote') {
            return this.analisisxlote(createAnalisisSensorialDTO, id);
        } else if (type === 'muestra') {
            return this.analisisxmuestra(createAnalisisSensorialDTO, id);
        } else {
            throw new Error('Tipo de analisis no soportado');
        }
    }


    private async analisisxlote (createAnalisisSensorialDTO: CreateAnalisisSensorialDTO, id_lote: string){
        // si el lote no tiene analisis
        // se crea un nuevo analisis reporte
        // se agrega el nuevo analisis reporte al historial
        // se agrega el analisis reporte al lote
        // se crea analisis sensorial y se agrega a nuevo analisis reporte
        // si el lote tiene analisis
        // si el analisis reporte este completo
        // se crea un nuevo analisis reporte
        // se agrega el nuevo analisis reporte al historial
        // se edita el analisis reporte al lote
        // se crea analisis sensorial y se agrega a nuevo analisis reporte
        // si el analisis reporte no esta completo
        // el analisis sensorial no esta agregado	
        // se crea el analisis sensorial y se agrega al analisis reporte
        // el analisis sensorial esta agregado	
        // manda error ('el analisis reporte ya tiene un analisis sensorial agregado, y no esta completo ')
        const lote = await this.loteRepository.getLoteById(id_lote);
        if (!lote) {
            throw new Error(`Lote con id ${id_lote} no encontrado`);
        }
        let analisis = lote.id_analisis;
        if (!analisis) {
            // se crea el analisis sensorial
            const as = await this.AnalisisSensorialRepository.createAnalisisSensorial(createAnalisisSensorialDTO);
            // si el lote no tiene analisis, se crea un nuevo analisis
            const [e, newAnalisisDto] = CreateAnalisisDto.create({
                analisisSensorial_id: as.id_analisis_sensorial
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

            return as;

        }
        else {
            const analisis2 = await this.analisisRepository.getAnalisisById(analisis);
            if (!analisis2) {
                throw new Error(`Analisis with id ${analisis} not found`);
            }
            if (!analisis2.analisisSensorial_id) {
                //el reporte no esta completo
                // se crea un nuevo analisis sensorial
                const af = await this.AnalisisSensorialRepository.createAnalisisSensorial(createAnalisisSensorialDTO);
                // se agrega el analisis sensorial al analisis reporte
                const [e, updateAnalisisDto] = UpdateAnalisisDto.update({
                    analisisSensorial_id: af.id_analisis_sensorial
                });
                if (e) {
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                await this.analisisRepository.updateAnalisis(analisis2.id_analisis, updateAnalisisDto!);
                return af;
            }
            else if (analisis2.analisisSensorial_id) {
                if (!analisis2.analisisFisico_id) throw new Error('El analisis reporte ya tiene un analisis sensorial agregado, y le falta completar el analisis sensorial');
                //el reporte esta completo
                // se crea un nuevo analisis sensorial
                const as = await this.AnalisisSensorialRepository.createAnalisisSensorial(createAnalisisSensorialDTO);
                // se crea un nuevo analisis reporte
                const [e, newAnalisisDto] = CreateAnalisisDto.create({
                    analisisSensorial_id: as.id_analisis_sensorial
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
                return as;
            }
            // If none of the above conditions are met, throw an error to ensure all code paths return or throw
            throw new Error('No se pudo crear el análisis físico: condiciones no satisfechas.');
        }
    }

    private async analisisxmuestra ( createAnalisisSensorialDTO: CreateAnalisisSensorialDTO, id_lote: string ){
        // si la muestra no tiene analisis
        // se crea un nuevo analisis reporte
        // se agrega el nuevo analisis reporte al historial
        // se agrega el analisis reporte a la muestra
        // se crea analisis sensorial y se agrega a nuevo analisis reporte
        // si la muestra tiene analisis
        // si el analisis reporte este completo
        // se crea un nuevo analisis reporte
        // se agrega el nuevo analisis reporte al historial
        // se edita el analisis reporte a la muestra
        // se crea analisis sensorial y se agrega a nuevo analisis reporte
        // si el analisis reporte no esta completo
        // el analisis sensorial no esta agregado	
        // se crea el analisis sensorial y se agrega al analisis reporte
        // el analisis sensorial esta agregado	
        // manda error ('el analisis reporte ya tiene un analisis sensorial agregado, y no esta completo ')
        const muestra = await this.muestraRepository.getMuestraById(id_lote);
        if (!muestra) {
            throw new Error(`Muestra con id ${id_lote} no encontrado`);
        }
        let analisis = muestra.id_analisis;
        if (!analisis) {
            // se crea el analisis sensorial
            const as = await this.AnalisisSensorialRepository.createAnalisisSensorial(createAnalisisSensorialDTO);
            // si la muestra no tiene analisis, se crea un nuevo analisis
            const [e, newAnalisisDto] = CreateAnalisisDto.create({
                analisisSensorial_id: as.id_analisis_sensorial
            });
            if (e) {
                throw new Error(`Error creating new analisis: ${e}`);
            }
            const newAnalisis = await this.analisisRepository.createAnalisis(newAnalisisDto!);
            // se crea un nuevo lote analisis historial
            const [a, newmuestraAnalisis] = CreateMuestraAnalisisDto.create({
                id_muestra: id_lote,
                id_analisis: (await newAnalisis).id_analisis
            });
            if (a) {
                throw new Error(`Error creating new lote analisis: ${a}`);
            }
            await this.muestraAnalisisRepository.create(newmuestraAnalisis!);
            // se actualiza el lote con el nuevo analisis
            const [b, updateMuestra] = UpdateMuestraDto.update({
                id_analisis: (await newAnalisis).id_analisis
            });
            if (b) {
                throw new Error(`Error updating muestra with new analisis: ${b}`);
            }
            await this.muestraRepository.updateMuestra(id_lote, updateMuestra!);

            return as;

        }
        else {
            const analisis2 = await this.analisisRepository.getAnalisisById(analisis);
            if (!analisis2) {
                throw new Error(`Analisis with id ${analisis} not found`);
            }
            if (!analisis2.analisisSensorial_id) {
                //el reporte no esta completo
                // se crea un nuevo analisis sensorial
                const af = await this.AnalisisSensorialRepository.createAnalisisSensorial(createAnalisisSensorialDTO);
                // se agrega el analisis sensorial al analisis reporte
                const [e, updateAnalisisDto] = UpdateAnalisisDto.update({
                    analisisSensorial_id: af.id_analisis_sensorial
                });
                if (e) {
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                await this.analisisRepository.updateAnalisis(analisis2.id_analisis, updateAnalisisDto!);
                return af;
            }
            else if (analisis2.analisisSensorial_id) {
                if (!analisis2.analisisFisico_id) throw new Error('El analisis reporte ya tiene un analisis sensorial agregado, y le falta completar el analisis sensorial');
                //el reporte esta completo
                // se crea un nuevo analisis sensorial
                const as = await this.AnalisisSensorialRepository.createAnalisisSensorial(createAnalisisSensorialDTO);
                // se crea un nuevo analisis reporte
                const [e, newAnalisisDto] = CreateAnalisisDto.create({
                    analisisSensorial_id: as.id_analisis_sensorial
                });
                if (e) {
                    throw new Error(`Error al crear un nuevo analisis: ${e}`);
                }
                const newAnalisis = await this.analisisRepository.createAnalisis(newAnalisisDto!);
                // se crea un nuevo lote analisis historial
                const [a, newMuestraAnalisis] = CreateMuestraAnalisisDto.create({
                    id_muestra: id_lote,
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
                await this.muestraRepository.updateMuestra(id_lote, updateMuestra!);
                return as;
            }
            // If none of the above conditions are met, throw an error to ensure all code paths return or throw
            throw new Error('No se pudo crear el análisis físico: condiciones no satisfechas.');
        }
    }
    
}

