import { FinalizeBalonGasDto } from '../../dtos/balon-gas/finalize-balon-gas';
import { StartBalonGasDto } from '../../dtos/balon-gas/start-balon-gas';
import { BalonGasEntity } from '../../entities/balon-gas.entity';
import { BalonGasRepository } from '../../repository/balon-gas.repository';

export interface StartBalonGasUseCase {
    execute(dto: StartBalonGasDto): Promise<BalonGasEntity>;
}

export class StartBalonGas implements StartBalonGasUseCase {
    constructor(
        private readonly repository: BalonGasRepository,
    ) { }

    async execute(dto: StartBalonGasDto): Promise<BalonGasEntity> {

        const balonNuevo = await this.repository.getById(dto.id_balon_gas);

        if (balonNuevo.estado === 'FINALIZADO') {
            throw new Error('No puedes iniciar un balón que ya fue finalizado');
        }

        if (balonNuevo.estado === 'EN_USO') {
            throw new Error('Este balón ya está en uso');
        }

        const balonActual = await this.repository.getActual();

        if (balonActual) {

            if (balonActual.id_balon_gas === dto.id_balon_gas) {
                throw new Error('Este balón ya está en uso');
            }

            const [error, finalizeDto] = FinalizeBalonGasDto.create({
                id_balon_gas: balonActual.id_balon_gas,
                id_tueste_fin: dto.id_tueste_inicio,
                id_user_fin_uso: dto.id_user_inicio_uso,
                fecha_fin_uso: Date.now(),
            });

            if (error) throw new Error(error);

            await this.repository.finalize(finalizeDto!);
        }

        return await this.repository.start(dto);
    }
}