import { CreateTransportistaDto } from "../../dtos/transportista/create";
import { TransportistaEntity } from "../../entities/transportista.entity";
import { TransportistaRepository } from "../../repository/transportista.repository";

export interface CreateTransportistaUseCase {
    execute(dto: CreateTransportistaDto): Promise<TransportistaEntity>;
}

export class CreateTransportista implements CreateTransportistaUseCase {
    constructor(private readonly repository: TransportistaRepository) { }

    async execute(dto: CreateTransportistaDto): Promise<TransportistaEntity> {
        return this.repository.create(dto);
    }
}
