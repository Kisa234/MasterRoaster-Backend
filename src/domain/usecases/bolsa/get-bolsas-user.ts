import { BolsaEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface GetBolsasByUserIdUseCase {
    execute(id_user: string, incluirEliminados?: boolean): Promise<BolsaEntity[]>;
}

export class GetBolsasByUserId implements GetBolsasByUserIdUseCase {
    constructor(private readonly bolsaRepository: BolsaRepository) { }

    execute(id_user: string, incluirEliminados: boolean = false): Promise<BolsaEntity[]> {
        return this.bolsaRepository.getBolsasByUserId(id_user, incluirEliminados);
    }
}