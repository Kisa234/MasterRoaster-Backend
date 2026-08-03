import { PaqueteConItemsEntity } from "../../entities/paquete.entity";
import { PaqueteRepository } from "../../repository/paquete.repository";

export interface GetPaqueteUseCase {
    execute(id_paquete: string): Promise<PaqueteConItemsEntity>;
}

export class GetPaquete implements GetPaqueteUseCase {
    constructor(private readonly paqueteRepo: PaqueteRepository) { }

    async execute(id_paquete: string): Promise<PaqueteConItemsEntity> {
        const paquete = await this.paqueteRepo.getByIdConItems(id_paquete);
        if (!paquete) throw new Error('Paquete no encontrado');
        return paquete;
    }
}
