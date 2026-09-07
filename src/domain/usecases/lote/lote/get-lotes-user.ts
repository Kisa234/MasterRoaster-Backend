import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";

export interface GetLotesByUserIdUseCase {
    execute(id: string, incluirEliminados?: boolean): Promise<LoteEntity[]>;
}

export class GetLotesByUserId implements GetLotesByUserIdUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ) { }

    async execute(id: string, incluirEliminados: boolean = false): Promise<LoteEntity[]> {
        return this.loteRepository.getLotesByUserId(id, incluirEliminados);
    }
}