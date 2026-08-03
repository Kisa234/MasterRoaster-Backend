import { TransportistaEntity } from "../../entities/transportista.entity";
import { TransportistaRepository } from "../../repository/transportista.repository";

export interface GetTransportistaUseCase {
    execute(id: string): Promise<TransportistaEntity>;
}

export class GetTransportista implements GetTransportistaUseCase {
    constructor(private readonly repository: TransportistaRepository) { }

    async execute(id: string): Promise<TransportistaEntity> {
        const transportista = await this.repository.getById(id);
        if (!transportista) throw new Error('Transportista no encontrado');
        return transportista;
    }
}
