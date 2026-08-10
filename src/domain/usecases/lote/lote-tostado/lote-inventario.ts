import { LoteTostadoRepository } from '../../../repository/loteTostado.repository';
import { LoteTostadoConInventarioEntity } from '../../../entities/loteTostado.entity';

export interface GetLotesTostadosConInventarioUseCase {
    execute(incluirEliminados?: boolean): Promise<LoteTostadoConInventarioEntity[]>;
}

export class GetLotesTostadosConInventario implements GetLotesTostadosConInventarioUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ) { }

    execute(incluirEliminados: boolean = false): Promise<LoteTostadoConInventarioEntity[]> {
        return this.loteTostadoRepository.getLotesTostadosConInventario(incluirEliminados);
    }
}