import { EnvioEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";

export interface GetEnviosUseCase {
    execute(estado?: string): Promise<EnvioEntity[]>;
}

export class GetEnvios implements GetEnviosUseCase {
    constructor(private readonly envioRepo: EnvioRepository) { }

    async execute(estado?: string): Promise<EnvioEntity[]> {
        return this.envioRepo.getAll(estado);
    }
}
