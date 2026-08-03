import { EnvioConDetalleEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";

export interface GetEnvioUseCase {
    execute(id_envio: string): Promise<EnvioConDetalleEntity>;
}

export class GetEnvio implements GetEnvioUseCase {
    constructor(private readonly envioRepo: EnvioRepository) { }

    async execute(id_envio: string): Promise<EnvioConDetalleEntity> {
        const envio = await this.envioRepo.getByIdConDetalle(id_envio);
        if (!envio) throw new Error('Envío no encontrado');
        return envio;
    }
}
