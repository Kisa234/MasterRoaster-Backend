import { ProgramarEnvioDto } from "../../dtos/envio/programar";
import { EnvioEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";

export interface ProgramarEnvioUseCase {
    execute(id_envio: string, dto: ProgramarEnvioDto): Promise<EnvioEntity>;
}

export class ProgramarEnvio implements ProgramarEnvioUseCase {
    constructor(private readonly envioRepo: EnvioRepository) { }

    async execute(id_envio: string, dto: ProgramarEnvioDto): Promise<EnvioEntity> {
        const envio = await this.envioRepo.getById(id_envio);
        if (!envio) throw new Error('Envío no encontrado');
        if (envio.estado !== 'PENDIENTE')
            throw new Error('Solo se puede programar un envío en estado PENDIENTE');

        return this.envioRepo.programar(id_envio, dto);
    }
}
