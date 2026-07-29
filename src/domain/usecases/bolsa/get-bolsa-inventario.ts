import { BolsaConInventarioEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface GetBolsaInventarioUseCase {
    execute(incluirEliminados: boolean): Promise<BolsaConInventarioEntity[]>;
}

export class GetBolsaInventario implements GetBolsaInventarioUseCase {
    constructor(
        private readonly bolsaRepository: BolsaRepository
    ) { }

    async execute(incluirEliminados: boolean): Promise<BolsaConInventarioEntity[]> {
        return await this.bolsaRepository.getBolsasConInventario(incluirEliminados);
    }
}