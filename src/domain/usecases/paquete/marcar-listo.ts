import { MarcarListoPaqueteDto } from "../../dtos/paquete/marcar-listo";
import { PaqueteEntity } from "../../entities/paquete.entity";
import { PaqueteRepository } from "../../repository/paquete.repository";
import { PaqueteItemRepository } from "../../repository/paquete-item.repository";
import { InventarioGenericoRepository } from "../../repository/inventario-generico.repository";

export interface MarcarListoPaqueteUseCase {
    execute(id_paquete: string, dto: MarcarListoPaqueteDto): Promise<PaqueteEntity>;
}

export class MarcarListoPaquete implements MarcarListoPaqueteUseCase {
    constructor(
        private readonly paqueteRepo: PaqueteRepository,
        private readonly paqueteItemRepo: PaqueteItemRepository,
        private readonly inventarioRepo: InventarioGenericoRepository,
    ) { }

    async execute(id_paquete: string, dto: MarcarListoPaqueteDto): Promise<PaqueteEntity> {
        const paquete = await this.paqueteRepo.getById(id_paquete);
        if (!paquete) throw new Error('Paquete no encontrado');
        if (paquete.estado !== 'EN_PREPARACION')
            throw new Error('El paquete no está en preparación');

        const items = await this.paqueteItemRepo.getByPaquete(id_paquete);
        if (items.length === 0) throw new Error('El paquete no tiene artículos');

        // Revalidación de stock (segunda pasada): puede haber pasado tiempo
        // desde que se agregó el primer item.
        for (const item of items) {
            const disponible = await this.inventarioRepo.obtenerStockDisponible({
                entidad: item.entidad,
                id_entidad: item.id_entidad,
                id_almacen: item.id_almacen,
                cantidad: item.cantidad,
                gramaje: item.gramaje,
                molienda: item.molienda,
            });
            if (disponible < item.cantidad) {
                throw new Error(`Stock insuficiente para ${item.entidad} ${item.id_entidad}: disponible ${disponible}, requerido ${item.cantidad}`);
            }
        }

        return this.paqueteRepo.actualizarEstado(id_paquete, 'LISTO', {
            preparado_por_id: dto.preparado_por_id,
            fecha_preparado: new Date(),
        });
    }
}
