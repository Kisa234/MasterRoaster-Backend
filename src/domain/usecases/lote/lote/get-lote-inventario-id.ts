
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteConInventarioEntity, LoteEntity } from "../../../entities/lote.entity";

export interface GetLoteInventarioByIdUseCase {
    execute(id: string): Promise<LoteConInventarioEntity | null>;
}

export class GetLoteInventarioById implements GetLoteInventarioByIdUseCase {
    constructor(
        private readonly loteRepository: LoteRepository
    ){}

    async execute(id: string): Promise<LoteConInventarioEntity | null> {
        return await this.loteRepository.getLoteConInventarioById(id);
    }
}