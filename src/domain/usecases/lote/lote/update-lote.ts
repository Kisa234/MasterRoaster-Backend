import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";
import { UpdateLoteDto } from "../../../dtos/lotes/lote/update";
import { Historial } from '@prisma/client';
import { HistorialRepository } from '../../../repository/historial.repository';


export interface UpdateLoteUseCase {
    execute(id:string , updateLoteDto: UpdateLoteDto): Promise<LoteEntity>;
}

export class UpdateLote implements UpdateLoteUseCase {
    constructor(
        private readonly loteRepository: LoteRepository,
    ){}

    async execute( id:string ,updateLoteDto: UpdateLoteDto): Promise<LoteEntity> {  
        
                
        return this.loteRepository.updateLote(id, updateLoteDto);

    }
}