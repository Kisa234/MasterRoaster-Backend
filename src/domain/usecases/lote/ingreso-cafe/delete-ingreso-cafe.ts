import { IngresoCafeEntity } from "../../../entities/ingreso-cafe.entity";
import { IngresoCafeRepository } from "../../../repository/ingreso-cafe.repository";

export interface DeleteIngresoCafeUseCase {
    execute(id: string): Promise<IngresoCafeEntity>;
}

export class DeleteIngresoCafe implements DeleteIngresoCafeUseCase {

    constructor(
        private readonly ingresoCafeRepository: IngresoCafeRepository
    ) {}

    execute(id: string): Promise<IngresoCafeEntity> {
        return this.ingresoCafeRepository.deleteIngresoCafe(id);
    }
}
