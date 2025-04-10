import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface GetAllTuesteUseCase {
    execute(): Promise<TuesteEntity[] | null>;
}


export class GetAllTueste implements GetAllTuesteUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository
    ){}

    async execute(): Promise<TuesteEntity[] | null> {
        return this.tuesteRepository.getAllTuestes();
    }
}