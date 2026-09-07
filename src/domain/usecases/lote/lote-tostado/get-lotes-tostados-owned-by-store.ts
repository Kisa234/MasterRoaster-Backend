import { LoteTostadoEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

export interface GetLotesTostadosOwnedByStoreUseCase {
    execute(incluirEliminados?: boolean): Promise<LoteTostadoEntity[]>;
}

export class GetLotesTostadosOwnedByStore implements GetLotesTostadosOwnedByStoreUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ) { }

    execute(incluirEliminados: boolean = false): Promise<LoteTostadoEntity[]> {
        return this.loteTostadoRepository.getLotesTostadosOwnedByStore(incluirEliminados);
    }
}