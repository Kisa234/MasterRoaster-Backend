import { UpdateTuesteDto } from "../../dtos/tueste/update";
import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface UpdateTuesteUseCase {
    execute(id: string, updateTuesteDto: UpdateTuesteDto): Promise<TuesteEntity>;
}

export class UpdateTueste implements UpdateTuesteUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository
    ){}

    async execute(id: string, updateTuesteDto: UpdateTuesteDto): Promise<TuesteEntity> {
        return this.tuesteRepository.updateTueste(id, updateTuesteDto);
    }
}