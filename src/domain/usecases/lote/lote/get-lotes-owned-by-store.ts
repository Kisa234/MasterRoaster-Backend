import { LoteEntity } from "../../../entities/lote.entity";
import { LoteRepository } from "../../../repository/lote.repository";

export interface GetLotesOwnedByStoreUseCase {
    execute(incluirEliminados?: boolean): Promise<LoteEntity[]>;
}

export class GetLotesOwnedByStore implements GetLotesOwnedByStoreUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ) { }

    execute(incluirEliminados: boolean = false): Promise<LoteEntity[]> {
        return this.loteRepository.getLotesOwnedByStore(incluirEliminados);
    }
}