import { CancelarEnvioDto } from "../../dtos/envio/cancelar";
import { EnvioEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";
import { PaqueteRepository } from "../../repository/paquete.repository";

export interface CancelarEnvioUseCase {
    execute(id_envio: string, dto: CancelarEnvioDto): Promise<EnvioEntity>;
}

export class CancelarEnvio implements CancelarEnvioUseCase {
    constructor(
        private readonly envioRepo: EnvioRepository,
        private readonly paqueteRepo: PaqueteRepository,
    ) { }

    async execute(id_envio: string, dto: CancelarEnvioDto): Promise<EnvioEntity> {
        const envio = await this.envioRepo.getById(id_envio);
        if (!envio) throw new Error('Envío no encontrado');
        if (envio.estado === 'DESPACHADO' || envio.estado === 'EN_TRANSITO' || envio.estado === 'ENTREGADO')
            throw new Error('No se puede cancelar un envío que ya fue despachado. Use registrar devolución en su lugar.');

        const envioActualizado = await this.envioRepo.cancelar(id_envio, dto);

        // El paquete vuelve a LISTO, no queda huérfano en un estado intermedio.
        await this.paqueteRepo.actualizarEstado(envio.id_paquete, 'LISTO');

        return envioActualizado;
    }
}
