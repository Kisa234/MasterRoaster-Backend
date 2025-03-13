
import { LoteRepository } from '../../repository/lote.repository';
import { LoteEntity } from "../../entities/lote.entity";



export interface GetLoteUseByEstadoCase {
    execute(estado:string ): Promise<LoteEntity[]>;
}

export class GetLoteByEstado implements GetLoteUseByEstadoCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute( estado:string ): Promise<LoteEntity[]> {
        return this.loteRepository.getLotesByEstado(estado);
    }
}