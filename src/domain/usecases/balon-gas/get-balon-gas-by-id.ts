import { BalonGasEntity } from "../../entities/balon-gas.entity";
import { BalonGasRepository } from "../../repository/balon-gas.repository";

export interface GetBalonGasByIdUsecase {
    execute(id_balon_gas: string): Promise<BalonGasEntity>;
}

export class GetBalonGasById implements GetBalonGasByIdUsecase {
    constructor(
        private readonly repository: BalonGasRepository
    ) {}

    async execute(id_balon_gas: string): Promise<BalonGasEntity> {

        if (!id_balon_gas) {
            throw new Error('El id del balón de gas es obligatorio');
        }

        return await this.repository.getById(id_balon_gas);
    }
}