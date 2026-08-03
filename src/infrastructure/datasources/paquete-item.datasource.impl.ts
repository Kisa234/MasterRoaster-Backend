import { prisma } from "../../data/postgres";
import { PaqueteItemDataSource } from "../../domain/datasources/paquete-item.datasource";
import { CreatePaqueteItemDto } from "../../domain/dtos/paquete-item/create";
import { PaqueteItemEntity } from "../../domain/entities/paquete-item.entity";

export class PaqueteItemDataSourceImpl implements PaqueteItemDataSource {

    async create(dto: CreatePaqueteItemDto): Promise<PaqueteItemEntity> {
        const item = await prisma.paqueteItem.create({
            data: {
                id_paquete: dto.id_paquete,
                entidad: dto.entidad as any,
                id_entidad: dto.id_entidad,
                id_almacen: dto.id_almacen,
                cantidad: dto.cantidad,
                unidad_medida: dto.unidad_medida,
                gramaje: dto.gramaje,
                molienda: dto.molienda,
                comentario: dto.comentario,
            },
        });
        return PaqueteItemEntity.fromObject(item);
    }

    async getById(id_item: string): Promise<PaqueteItemEntity | null> {
        const item = await prisma.paqueteItem.findUnique({ where: { id_item } });
        if (!item) return null;
        return PaqueteItemEntity.fromObject(item);
    }

    async getByPaquete(id_paquete: string): Promise<PaqueteItemEntity[]> {
        const items = await prisma.paqueteItem.findMany({ where: { id_paquete } });
        return items.map(PaqueteItemEntity.fromObject);
    }

    async delete(id_item: string): Promise<PaqueteItemEntity> {
        // Hard delete real: PaqueteItem no tiene `eliminado` en el schema.
        const deleted = await prisma.paqueteItem.delete({ where: { id_item } });
        return PaqueteItemEntity.fromObject(deleted);
    }
}
