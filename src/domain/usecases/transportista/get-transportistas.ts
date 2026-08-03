import { TransportistaEntity } from "../../entities/transportista.entity";
import { TransportistaRepository } from "../../repository/transportista.repository";

export interface GetTransportistasUseCase {
    execute(soloActivos?: boolean): Promise<TransportistaEntity[]>;
}

export class GetTransportistas implements GetTransportistasUseCase {
    constructor(private readonly repository: TransportistaRepository) { }

    async execute(soloActivos: boolean = true): Promise<TransportistaEntity[]> {
        return this.repository.getAll(soloActivos);
    }
}
