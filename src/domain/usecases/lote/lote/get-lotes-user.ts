
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";



export interface GetLotesByUserIdUseCase {
    execute(id:string ): Promise<LoteEntity[]>;
}

export class GetLotesByUserId implements GetLotesByUserIdUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute( id:string ): Promise<LoteEntity[]> {
        return this.loteRepository.getLotesByUserId(id);
    }
}