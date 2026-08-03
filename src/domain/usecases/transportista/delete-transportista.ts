import { TransportistaEntity } from "../../entities/transportista.entity";
import { TransportistaRepository } from "../../repository/transportista.repository";

export interface DeleteTransportistaUseCase {
    execute(id: string): Promise<TransportistaEntity>;
}

export class DeleteTransportista implements DeleteTransportistaUseCase {
    constructor(private readonly repository: TransportistaRepository) { }

    async execute(id: string): Promise<TransportistaEntity> {
        return this.repository.delete(id);
    }
}
