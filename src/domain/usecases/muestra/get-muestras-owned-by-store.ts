import { MuestraEntity } from "../../entities/muestra.entity";
import { MuestraRepository } from "../../repository/muestra.repository";

export interface GetMuestrasOwnedByStoreUseCase {
    execute(incluirEliminados: boolean): Promise<MuestraEntity[]>;
}

export class GetMuestrasOwnedByStore implements GetMuestrasOwnedByStoreUseCase {
    constructor(private readonly repository: MuestraRepository) {}

    async execute(incluirEliminados: boolean = false): Promise<MuestraEntity[]> {
        return this.repository.getMuestrasOwnedByStore(incluirEliminados);
    }
}