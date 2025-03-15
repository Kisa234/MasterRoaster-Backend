import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface GetTuesteUseCase {
    execute(id: string): Promise<TuesteEntity | null>;
}


export class GetTueste implements GetTuesteUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository
    ){}

    async execute(id: string): Promise<TuesteEntity | null> {
        return this.tuesteRepository.getTuesteById(id);
    }
}