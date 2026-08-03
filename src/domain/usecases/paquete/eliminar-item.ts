import { PaqueteItemEntity } from "../../entities/paquete-item.entity";
import { PaqueteRepository } from "../../repository/paquete.repository";
import { PaqueteItemRepository } from "../../repository/paquete-item.repository";

export interface EliminarItemPaqueteUseCase {
    execute(id_item: string): Promise<PaqueteItemEntity>;
}

export class EliminarItemPaquete implements EliminarItemPaqueteUseCase {
    constructor(
        private readonly paqueteRepo: PaqueteRepository,
        private readonly paqueteItemRepo: PaqueteItemRepository,
    ) { }

    async execute(id_item: string): Promise<PaqueteItemEntity> {
        const item = await this.paqueteItemRepo.getById(id_item);
        if (!item) throw new Error('Artículo no encontrado');

        const paquete = await this.paqueteRepo.getById(item.id_paquete);
        if (!paquete) throw new Error('Paquete no encontrado');
        if (paquete.estado !== 'EN_PREPARACION')
            throw new Error('Solo se pueden quitar artículos mientras el paquete está en preparación');

        return this.paqueteItemRepo.delete(id_item);
    }
}
