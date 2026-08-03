import { ConfirmarEntregaEnvioDto } from "../../dtos/envio/confirmar-entrega";
import { EnvioEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";

export interface ConfirmarEntregaEnvioUseCase {
    execute(id_envio: string, dto: ConfirmarEntregaEnvioDto): Promise<EnvioEntity>;
}

export class ConfirmarEntregaEnvio implements ConfirmarEntregaEnvioUseCase {
    constructor(private readonly envioRepo: EnvioRepository) { }

    async execute(id_envio: string, dto: ConfirmarEntregaEnvioDto): Promise<EnvioEntity> {
        const envio = await this.envioRepo.getById(id_envio);
        if (!envio) throw new Error('Envío no encontrado');
        if (envio.estado !== 'DESPACHADO' && envio.estado !== 'EN_TRANSITO')
            throw new Error('El envío debe estar despachado o en tránsito para confirmar la entrega');

        return this.envioRepo.confirmarEntrega(id_envio, dto);
    }
}
