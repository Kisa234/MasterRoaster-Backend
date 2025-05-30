import { CreateLoteDto } from "../../../dtos/lotes/lote/create";
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";
import { UserRepository } from "../../../repository/user.repository";
import { MuestraRepository } from "../../../repository/muestra.repository";
import { CreateLoteUseCase } from "./create-lote";



export interface CreateLoteFromMuestraUseCase {
    execute(id: string,peso:number): Promise<LoteEntity>;
}

export class CreateLoteFromMuestra implements CreateLoteFromMuestraUseCase {
    constructor(
        private readonly createLoteUseCase: CreateLoteUseCase,
        private readonly muestraRepository: MuestraRepository,
    ){}

    async execute(id: string,peso:number): Promise<LoteEntity> {
        const muestra = await this.muestraRepository.getMuestraById(id);
        if (!muestra) {
            throw new Error('Muestra no encontrada');
        }
        const [ , dto] = CreateLoteDto.create({
            productor    : muestra.productor,
            finca        : muestra.finca,
            region       : muestra.region,
            departamento : muestra.departamento,
            peso         : peso,
            variedades   : muestra.variedades,
            proceso      : muestra.proceso,
            tipo_lote    : 'Lote Verde',
            id_user      : muestra.id_user,
            id_analisis  : muestra.analisis_id,
        })
        // eliminar muestra 
        await this.muestraRepository.deleteMuestra(muestra.id_muestra);


        return await this.createLoteUseCase.execute(dto!)
    }

   
}