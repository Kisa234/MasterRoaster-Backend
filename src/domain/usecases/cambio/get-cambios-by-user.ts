import { CambioEntity } from "../../entities/cambio.entity";
import { CambioRepository } from "../../repository/cambio.repository";

export interface GetCambiosByUserUseCase {
    execute(id_user: string): Promise<CambioEntity[]>;
}

export class GetCambiosByUser implements GetCambiosByUserUseCase {

    constructor(
        private readonly cambioRepository: CambioRepository
    ) {}

    execute(id_user: string): Promise<CambioEntity[]> {
        return this.cambioRepository.getCambiosByUser(id_user);
    }
}
