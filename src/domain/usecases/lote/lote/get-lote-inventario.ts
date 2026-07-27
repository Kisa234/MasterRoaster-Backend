
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteConInventarioEntity, LoteEntity } from "../../../entities/lote.entity";

export interface GetLoteInventarioUseCase {
    execute(incluirEliminados: boolean): Promise<LoteConInventarioEntity[]>;
}

export class GetLoteInventario implements GetLoteInventarioUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute( incluirEliminados: boolean ): Promise<LoteConInventarioEntity[]> {
        return await this.loteRepository.getLotesConInventario(incluirEliminados);
    }
}