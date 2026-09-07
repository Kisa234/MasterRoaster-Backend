import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface GetTuestesOwnedByStoreUseCase {
    execute(incluirEliminados?: boolean): Promise<TuesteEntity[]>;
}

export class GetTuestesOwnedByStore implements GetTuestesOwnedByStoreUseCase {
    constructor(private readonly tuesteRepository: TuesteRepository) { }

    execute(incluirEliminados: boolean = false): Promise<TuesteEntity[]> {
        return this.tuesteRepository.getTuestesOwnedByStore(incluirEliminados);
    }
}