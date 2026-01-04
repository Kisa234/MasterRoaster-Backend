import { CreateIngresoCafeDto } from "../../../dtos/lotes/ingreso-cafe/create";
import { IngresoCafeEntity } from "../../../entities/ingreso-cafe.entity";
import { IngresoCafeRepository } from "../../../repository/ingreso-cafe.repository";

export interface CreateIngresoCafeUseCase {
    execute(createIngresoCafeDto: CreateIngresoCafeDto): Promise<IngresoCafeEntity>;
}

export class CreateIngresoCafe implements CreateIngresoCafeUseCase {

    constructor(
        private readonly ingresoCafeRepository: IngresoCafeRepository
    ) {}

    execute(createIngresoCafeDto: CreateIngresoCafeDto): Promise<IngresoCafeEntity> {
        return this.ingresoCafeRepository.createIngresoCafe(createIngresoCafeDto);
    }
}
