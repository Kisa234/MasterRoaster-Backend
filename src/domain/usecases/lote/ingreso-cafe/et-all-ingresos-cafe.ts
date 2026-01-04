import { IngresoCafeEntity } from "../../../entities/ingreso-cafe.entity";
import { IngresoCafeRepository } from "../../../repository/ingreso-cafe.repository";

export interface GetAllIngresosCafeUseCase {
    execute(): Promise<IngresoCafeEntity[]>;
}

export class GetAllIngresosCafe implements GetAllIngresosCafeUseCase {

    constructor(
        private readonly ingresoCafeRepository: IngresoCafeRepository
    ) {}

    execute(): Promise<IngresoCafeEntity[]> {
        return this.ingresoCafeRepository.getAllIngresosCafe();
    }
}
