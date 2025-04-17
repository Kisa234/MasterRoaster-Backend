
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";



export interface GetLoteUseCase {
    execute(id:string ): Promise<LoteEntity| null>;
}

export class GetLote implements GetLoteUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute( id:string ): Promise<LoteEntity| null> {
        return this.loteRepository.getLoteById(id);
    }
}