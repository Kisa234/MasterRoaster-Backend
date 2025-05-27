import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";
import { UpdateLoteDto } from "../../../dtos/lotes/lote/update";


export interface UpdateLoteUseCase {
    execute(id:string , updateLoteDto: UpdateLoteDto): Promise<LoteEntity>;
}

export class UpdateLote implements UpdateLoteUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute( id:string ,updateLoteDto: UpdateLoteDto): Promise<LoteEntity> {
        // Validar si el lote existe
        const lote = await this.loteRepository.getLoteById(id);
        if (!lote || lote.eliminado) {
            throw new Error('El lote no existe o fue eliminado');
        }
        // Validar que el peso no sea 0 o negativo
        if (updateLoteDto.peso && updateLoteDto.peso <= 0) {
            throw new Error('El peso del lote debe ser mayor a 0');
        }
        
        return this.loteRepository.updateLote(id, updateLoteDto);
    }
}