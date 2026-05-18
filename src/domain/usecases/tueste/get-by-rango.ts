import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface GetTuestesByRangoUseCase {
    execute(desde: Date, hasta: Date): Promise<TuesteEntity[]>;
}

export class GetTuestesByRango implements GetTuestesByRangoUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository
    ) {}

    async execute(desde: Date, hasta: Date): Promise<TuesteEntity[]> {
        return this.tuesteRepository.getTuestesByRango(desde, hasta);
    }
}