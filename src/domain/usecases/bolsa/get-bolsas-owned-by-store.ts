import { BolsaEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface GetBolsasOwnedByStoreUseCase {
    execute(incluirEliminados?: boolean): Promise<BolsaEntity[]>;
}

export class GetBolsasOwnedByStore implements GetBolsasOwnedByStoreUseCase {
    constructor(private readonly bolsaRepository: BolsaRepository) { }

    execute(incluirEliminados: boolean = false): Promise<BolsaEntity[]> {
        return this.bolsaRepository.getBolsasOwnedByStore(incluirEliminados);
    }
}