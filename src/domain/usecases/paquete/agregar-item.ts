import { CreatePaqueteItemDto } from "../../dtos/paquete-item/create";
import { PaqueteItemEntity } from "../../entities/paquete-item.entity";
import { PaqueteRepository } from "../../repository/paquete.repository";
import { PaqueteItemRepository } from "../../repository/paquete-item.repository";
import { InventarioGenericoRepository } from "../../repository/inventario-generico.repository";

export interface AgregarItemPaqueteUseCase {
    execute(dto: CreatePaqueteItemDto): Promise<PaqueteItemEntity>;
}

export class AgregarItemPaquete implements AgregarItemPaqueteUseCase {
    constructor(
        private readonly paqueteRepo: PaqueteRepository,
        private readonly paqueteItemRepo: PaqueteItemRepository,
        private readonly inventarioRepo: InventarioGenericoRepository,
    ) { }

    async execute(dto: CreatePaqueteItemDto): Promise<PaqueteItemEntity> {
        const paquete = await this.paqueteRepo.getById(dto.id_paquete);
        if (!paquete) throw new Error('Paquete no encontrado');
        if (paquete.estado !== 'EN_PREPARACION')
            throw new Error('Solo se pueden agregar artículos mientras el paquete está en preparación');

        // Validación de stock en el momento (no descuenta, solo avisa si no alcanza)
        const disponible = await this.inventarioRepo.obtenerStockDisponible({
            entidad: dto.entidad,
            id_entidad: dto.id_entidad,
            id_almacen: dto.id_almacen,
            cantidad: dto.cantidad,
            gramaje: dto.gramaje,
            molienda: dto.molienda,
        });
        if (disponible < dto.cantidad) {
            throw new Error(`Stock insuficiente: disponible ${disponible}, solicitado ${dto.cantidad}`);
        }

        return this.paqueteItemRepo.create(dto);
    }
}
