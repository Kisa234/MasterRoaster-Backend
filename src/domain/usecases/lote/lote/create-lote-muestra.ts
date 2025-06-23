import { UpdateLoteDto } from './../../../dtos/lotes/lote/update';
import { CreateLoteAnalisisDto } from './../../../dtos/lote-analisis/create';
import { CreateAnalisisFisicoDto } from './../../../dtos/analisis/fisico/create';
import { CreateLoteDto } from "../../../dtos/lotes/lote/create";
import { LoteEntity } from "../../../entities/lote.entity";
import { MuestraRepository } from "../../../repository/muestra.repository";
import { CreateLoteUseCase } from "./create-lote";
import { AnalisisRepository } from "../../../repository/analisis.repository";
import { AnalisisFisicoRepository } from "../../../repository/analisisFisico.repository";
import { AnalisisSensorialRepository } from '../../../repository/analisisSensorial.repository';
import { CreateAnalisisDto } from '../../../dtos/analisis/analisis/create';
import { LoteRepository } from '../../../repository/lote.repository';
import { CreateAnalisisSensorialDTO } from '../../../dtos/analisis/sensorial/create';
import { LoteAnalisisRepository } from '../../../repository/lote-analisis.repository';



export interface CreateLoteFromMuestraUseCase {
    execute(id: string,peso:number): Promise<LoteEntity>;
}

export class CreateLoteFromMuestra implements CreateLoteFromMuestraUseCase {
  constructor(
    private readonly createLoteUseCase: CreateLoteUseCase,
    private readonly loteAnalisisRepository: LoteAnalisisRepository,
    private readonly muestraRepository: MuestraRepository,
    private readonly analisisRepository: AnalisisRepository,
    private readonly analisisFisicoRepository: AnalisisFisicoRepository,
    private readonly analisisSensorialRepository: AnalisisSensorialRepository,
    private readonly loteRepository: LoteRepository,
  ){}

  async execute(id: string, peso: number): Promise<LoteEntity> {
    // 1) Load and validate the muestra
    const muestra = await this.muestraRepository.getMuestraById(id);
    if (!muestra) throw new Error('Muestra no encontrada');

    // 2) Create the new lote
    const [, createLoteDto] = CreateLoteDto.create({
      productor:    muestra.productor,
      finca:        muestra.finca,
      region:       muestra.region,
      departamento: muestra.departamento,
      peso,
      variedades:   muestra.variedades,
      proceso:      muestra.proceso,
      tipo_lote:    'Lote Verde',
      id_user:      muestra.id_user,
    });
    const lote = await this.createLoteUseCase.execute(createLoteDto!);

    // 3) If the muestra had an análisis, clone it onto the new lote
    if (muestra.id_analisis) {
      const analisis = await this.analisisRepository.getAnalisisById(muestra.id_analisis);
      if (!analisis) throw new Error('Análisis no encontrado');

      // 3a) Re-create físico
      let af = await this.analisisFisicoRepository.getAnalisisFisicoById(analisis.analisisFisico_id!);
      const [, dtoFis] = CreateAnalisisFisicoDto.create({ ...af! });
      const nuevoFis = await this.analisisFisicoRepository.createAnalisisFisico(dtoFis!);

      // 3b) Re-create sensorial
      let as = await this.analisisSensorialRepository.getAnalisisSensorialById(analisis.analisisSensorial_id!);
      const [, dtoSen] = CreateAnalisisSensorialDTO.create({ ...as! });
      const nuevoSen = await this.analisisSensorialRepository.createAnalisisSensorial(dtoSen!);

      // 3c) Tie them together in a new “analisis”
      const [, dtoAnalisis] = CreateAnalisisDto.create({
        analisisFisico_id:   nuevoFis.id_analisis_fisico,
        analisisSensorial_id: nuevoSen.id_analisis_sensorial,
      });
      const nuevoAnalisis = await this.analisisRepository.createAnalisis(dtoAnalisis!);

      // 3d) Create the lote-analisis pivot
      const [, dtoLoteAnalisis] = CreateLoteAnalisisDto.create({
        lote_id:    lote.id_lote,
        analisis_id: nuevoAnalisis.id_analisis,
      });
      await this.loteAnalisisRepository.create(dtoLoteAnalisis!);

      // 3e) Update the lote itself with the new análisis_id
      const [, dtoUpdateLote] = UpdateLoteDto.update({
        analisis_id: nuevoAnalisis.id_analisis
      });
      await this.loteRepository.updateLote(lote.id_lote, dtoUpdateLote!);
    }

    // 4) Finally, delete the original muestra
    await this.muestraRepository.deleteMuestra(muestra.id_muestra);

    // 5) Return the freshly created (and updated) LoteEntity
    return lote;
  }
}
