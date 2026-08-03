import { PaqueteEntity } from "../../entities/paquete.entity";
import { PaqueteRepository } from "../../repository/paquete.repository";

export interface GetPaquetesUseCase {
    execute(incluirEliminados?: boolean): Promise<PaqueteEntity[]>;
}

export class GetPaquetes implements GetPaquetesUseCase {
    constructor(private readonly paqueteRepo: PaqueteRepository) { }

    async execute(incluirEliminados: boolean = false): Promise<PaqueteEntity[]> {
        return this.paqueteRepo.getAll(incluirEliminados);
    }
}
