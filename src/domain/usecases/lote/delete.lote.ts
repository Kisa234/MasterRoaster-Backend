import { LoteRepository } from '../../repository/lote.repository';
import { LoteEntity } from "../../entities/lote.entity";



export interface DeleteLoteUseCase {
    execute(id:string ): Promise<LoteEntity| null>;
}

export class DeleteLote implements DeleteLoteUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute( id:string ): Promise<LoteEntity| null> {
        return this.loteRepository.deleteLote(id);
    }
}