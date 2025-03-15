import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface GetTostadosByFechaUseCase {
    execute(fecha: Date): Promise<TuesteEntity[]>;
}

export class GetTostadosByFecha implements GetTostadosByFechaUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository
    ){}

    async execute(fecha: Date): Promise<TuesteEntity[]> {
        return this.tuesteRepository.getTostadosByFecha(fecha);
    }
}
