import { MuestraEntity } from "../../entities/muestra.entity";
import { MuestraRepository } from "../../repository/muestra.repository";

export interface GetMuestrasByUserIdUseCase {
    execute(id_user: string, incluirEliminados: boolean): Promise<MuestraEntity[]>;
}

export class GetMuestrasByUserId implements GetMuestrasByUserIdUseCase {
    constructor(private readonly repository: MuestraRepository) {}

    async execute(id_user: string, incluirEliminados: boolean = false): Promise<MuestraEntity[]> {
        return this.repository.getMuestrasByUserId(id_user, incluirEliminados);
    }
}