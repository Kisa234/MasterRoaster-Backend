import { CancelarPaqueteDto } from "../../dtos/paquete/cancelar";
import { PaqueteEntity } from "../../entities/paquete.entity";
import { PaqueteRepository } from "../../repository/paquete.repository";

export interface CancelarPaqueteUseCase {
    execute(id_paquete: string, dto: CancelarPaqueteDto): Promise<PaqueteEntity>;
}

export class CancelarPaquete implements CancelarPaqueteUseCase {
    constructor(private readonly paqueteRepo: PaqueteRepository) { }

    async execute(id_paquete: string, dto: CancelarPaqueteDto): Promise<PaqueteEntity> {
        const paquete = await this.paqueteRepo.getById(id_paquete);
        if (!paquete) throw new Error('Paquete no encontrado');
        if (paquete.estado === 'DESPACHADO')
            throw new Error('No se puede cancelar un paquete ya despachado');

        return this.paqueteRepo.actualizarEstado(id_paquete, 'CANCELADO', {
            comentario: dto.comentario,
        });
    }
}
