import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface GetTuestesByUserIdUseCase {
    execute(id_cliente: string, incluirEliminados?: boolean): Promise<TuesteEntity[]>;
}

export class GetTuestesByUserId implements GetTuestesByUserIdUseCase {
    constructor(private readonly tuesteRepository: TuesteRepository) { }

    execute(id_cliente: string, incluirEliminados: boolean = false): Promise<TuesteEntity[]> {
        return this.tuesteRepository.getTuestesByUserId(id_cliente, incluirEliminados);
    }
}