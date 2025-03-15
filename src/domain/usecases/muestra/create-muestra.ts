import { CreateMuestraDto } from "../../dtos/muestra/create";
import { MuestraEntity } from "../../entities/muestra.entity";
import { MuestraRepository } from "../../repository/muestra.repository";

export interface CreateMuestraUseCase {
    execute(createMuestraDto: CreateMuestraDto): Promise<MuestraEntity>;
}

export class CreateMuestra implements CreateMuestraUseCase {
    constructor(
        private readonly muestraRepository: MuestraRepository
    ){}

    async execute(createMuestraDto: CreateMuestraDto): Promise<MuestraEntity> {
        return this.muestraRepository.createMuestra(createMuestraDto);
    }
}
