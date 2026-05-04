import { FinalizeBalonGasDto } from "../../dtos/balon-gas/finalize-balon-gas";
import { BalonGasEntity } from "../../entities/balon-gas.entity";
import { BalonGasRepository } from "../../repository/balon-gas.repository";

export interface FinalizeBalonGasUsecase {
    execute(dto: FinalizeBalonGasDto): Promise<BalonGasEntity>;
}

export class FinalizeBalonGas implements FinalizeBalonGasUsecase {
    constructor(
        private readonly repository: BalonGasRepository
    ) {}

    async execute(dto: FinalizeBalonGasDto): Promise<BalonGasEntity> {

        const balon = await this.repository.getById(dto.id_balon_gas);

        if (balon.estado === 'FINALIZADO') {
            throw new Error('Este balón ya fue finalizado');
        }

        if (balon.estado === 'DISPONIBLE') {
            throw new Error('No puedes finalizar un balón que aún no está en uso');
        }

        return await this.repository.finalize(dto);
    }
}