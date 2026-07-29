import { BolsaConInventarioEntity } from "../../entities/bolsa.entity";
import { BolsaRepository } from "../../repository/bolsa.repository";

export interface GetBolsaInventarioByIdUseCase {
    execute(id: string): Promise<BolsaConInventarioEntity | null>;
}

export class GetBolsaInventarioById implements GetBolsaInventarioByIdUseCase {
    constructor(
        private readonly bolsaRepository: BolsaRepository
    ) { }

    async execute(id: string): Promise<BolsaConInventarioEntity | null> {
        return await this.bolsaRepository.getBolsaConInventarioById(id);
    }
}