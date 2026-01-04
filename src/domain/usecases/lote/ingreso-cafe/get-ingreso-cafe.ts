import { IngresoCafeEntity } from "../../../entities/ingreso-cafe.entity";
import { IngresoCafeRepository } from "../../../repository/ingreso-cafe.repository";

export interface GetIngresoCafeUseCase {
    execute(id: string): Promise<IngresoCafeEntity | null>;
}

export class GetIngresoCafe implements GetIngresoCafeUseCase {

    constructor(
        private readonly ingresoCafeRepository: IngresoCafeRepository
    ) {}

    execute(id: string): Promise<IngresoCafeEntity | null> {
        return this.ingresoCafeRepository.getIngresoCafeById(id);
    }
}
