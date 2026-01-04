import { IngresoCafeEntity } from "../../../entities/ingreso-cafe.entity";
import { IngresoCafeRepository } from "../../../repository/ingreso-cafe.repository";

export interface GetIngresosByLoteUseCase {
    execute(id_lote: string): Promise<IngresoCafeEntity[]>;
}

export class GetIngresosByLote implements GetIngresosByLoteUseCase {

    constructor(
        private readonly ingresoCafeRepository: IngresoCafeRepository
    ) {}

    execute(id_lote: string): Promise<IngresoCafeEntity[]> {
        return this.ingresoCafeRepository.getIngresosByLote(id_lote);
    }
}
