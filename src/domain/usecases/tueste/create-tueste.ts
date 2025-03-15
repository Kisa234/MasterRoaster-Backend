import { CreateTuesteDto } from "../../dtos/tueste/create";
import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface CreateTuesteUseCase {
    execute(createTuesteDto: CreateTuesteDto): Promise<TuesteEntity>;
}

export class CreateTueste implements CreateTuesteUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository
    ){}

    async execute(createTuesteDto: CreateTuesteDto): Promise<TuesteEntity> {
        return this.tuesteRepository.createTueste(createTuesteDto);
    }
}