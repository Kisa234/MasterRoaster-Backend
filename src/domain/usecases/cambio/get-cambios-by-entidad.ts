import { CambioEntity } from "../../entities/cambio.entity";
import { CambioRepository } from "../../repository/cambio.repository";

export interface GetCambiosByEntidadUseCase {
    execute(entidad: string, id_entidad: string): Promise<CambioEntity[]>;
}

export class GetCambiosByEntidad implements GetCambiosByEntidadUseCase {

    constructor(
        private readonly cambioRepository: CambioRepository
    ) {}

    execute(entidad: string, id_entidad: string): Promise<CambioEntity[]> {
        return this.cambioRepository.getCambiosByEntidad(entidad, id_entidad);
    }
}
