import { UpdateTransportistaDto } from "../../dtos/transportista/update";
import { TransportistaEntity } from "../../entities/transportista.entity";
import { TransportistaRepository } from "../../repository/transportista.repository";

export interface UpdateTransportistaUseCase {
    execute(id: string, dto: UpdateTransportistaDto): Promise<TransportistaEntity>;
}

export class UpdateTransportista implements UpdateTransportistaUseCase {
    constructor(private readonly repository: TransportistaRepository) { }

    async execute(id: string, dto: UpdateTransportistaDto): Promise<TransportistaEntity> {
        return this.repository.update(id, dto);
    }
}
