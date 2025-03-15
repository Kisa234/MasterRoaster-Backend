import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface DeleteTuesteUseCase {
    execute(id: string): Promise<TuesteEntity | null>;
}

export class DeleteTueste implements DeleteTuesteUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository
    ){}

    async execute(id: string): Promise<TuesteEntity | null> {
        return this.tuesteRepository.getTuesteById(id);
    }
}
