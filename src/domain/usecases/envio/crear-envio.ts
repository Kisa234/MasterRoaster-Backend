import { CreateEnvioDto } from "../../dtos/envio/create";
import { CreateDireccionEnvioDto } from "../../dtos/direccion-envio/create";
import { EnvioEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";
import { DireccionEnvioRepository } from "../../repository/direccion-envio.repository";
import { PaqueteRepository } from "../../repository/paquete.repository";

export interface CrearEnvioUseCase {
    execute(dto: CreateEnvioDto): Promise<EnvioEntity>;
}

export class CrearEnvio implements CrearEnvioUseCase {
    constructor(
        private readonly envioRepo: EnvioRepository,
        private readonly direccionRepo: DireccionEnvioRepository,
        private readonly paqueteRepo: PaqueteRepository,
    ) { }

    async execute(dto: CreateEnvioDto): Promise<EnvioEntity> {
        const paquete = await this.paqueteRepo.getById(dto.id_paquete);
        if (!paquete) throw new Error('Paquete no encontrado');
        if (paquete.estado !== 'LISTO')
            throw new Error('El paquete debe estar en estado LISTO antes de registrar el envío');

        // Ya que Envio.id_paquete perdió el @unique (para permitir reintentos tras
        // cancelar/devolver), esta validación reemplaza esa garantía a nivel de código:
        // no puede haber más de un Envio "vivo" a la vez para el mismo Paquete.
        const activos = await this.envioRepo.getActivosByPaquete(dto.id_paquete);
        if (activos.length > 0) {
            throw new Error('Este paquete ya tiene un envío activo. Cancélalo o espera su devolución antes de crear uno nuevo.');
        }

        const total = await this.envioRepo.countTotal();
        const numero_correlativo = `ENV-${(total + 1).toString().padStart(6, '0')}`;

        const envio = await this.envioRepo.create(dto, numero_correlativo);

        const [errDir, direccionDto] = CreateDireccionEnvioDto.create({
            id_envio: envio.id_envio,
            ...dto.direccion,
        });
        if (errDir || !direccionDto) throw new Error(errDir ?? 'Error al crear la dirección de envío');
        await this.direccionRepo.create(direccionDto);

        return envio;
    }
}