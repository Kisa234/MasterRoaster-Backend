import { CreateCambioDto } from "../../dtos/cambio/create";
import { CambioEntity } from "../../entities/cambio.entity";
import { CambioRepository } from "../../repository/cambio.repository";

export interface CreateCambioUseCase {
    execute(createCambioDto: CreateCambioDto): Promise<CambioEntity>;
}

export class CreateCambio implements CreateCambioUseCase {

    constructor(
        private readonly cambioRepository: CambioRepository
    ) {}

    execute(createCambioDto: CreateCambioDto): Promise<CambioEntity> {
        return this.cambioRepository.createCambio(createCambioDto);
    }
}
