
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteConInventarioEntity, LoteEntity } from "../../../entities/lote.entity";

export interface GetLoteInventarioUseCase {
    execute(): Promise<LoteConInventarioEntity[]>;
}

export class GetLoteInventario implements GetLoteInventarioUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute( ): Promise<LoteConInventarioEntity[]> {
        return await this.loteRepository.getLotesConInventario();
    }
}