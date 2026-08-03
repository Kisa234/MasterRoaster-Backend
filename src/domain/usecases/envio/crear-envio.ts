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

        // Regla de negocio: correlativo tipo ENV-000001, secuencial simple por conteo total.
        // (Si el volumen de envíos simultáneos creciera mucho, convendría un contador
        // dedicado para evitar condiciones de carrera; con el volumen actual alcanza.)
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
