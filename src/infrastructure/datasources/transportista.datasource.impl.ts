import { prisma } from "../../data/postgres";
import { TransportistaDataSource } from "../../domain/datasources/transportista.datasource";
import { CreateTransportistaDto } from "../../domain/dtos/transportista/create";
import { UpdateTransportistaDto } from "../../domain/dtos/transportista/update";
import { TransportistaEntity } from "../../domain/entities/transportista.entity";

export class TransportistaDataSourceImpl implements TransportistaDataSource {

    async create(dto: CreateTransportistaDto): Promise<TransportistaEntity> {
        const transportista = await prisma.transportista.create({
            data: {
                nombre: dto.nombre,
                contacto: dto.contacto,
                telefono: dto.telefono,
            },
        });
        return TransportistaEntity.fromObject(transportista);
    }

    async getById(id: string): Promise<TransportistaEntity | null> {
        const transportista = await prisma.transportista.findUnique({ where: { id_transportista: id } });
        if (!transportista) return null;
        return TransportistaEntity.fromObject(transportista);
    }

    async update(id: string, dto: UpdateTransportistaDto): Promise<TransportistaEntity> {
        const transportista = await prisma.transportista.update({
            where: { id_transportista: id },
            data: dto.values,
        });
        return TransportistaEntity.fromObject(transportista);
    }

    async delete(id: string): Promise<TransportistaEntity> {
        // soft delete propio de este catálogo: se usa `activo` en vez de `eliminado`
        // porque el modelo Transportista no tiene campo `eliminado` en el schema.
        const transportista = await prisma.transportista.update({
            where: { id_transportista: id },
            data: { activo: false },
        });
        return TransportistaEntity.fromObject(transportista);
    }

    async getAll(soloActivos: boolean = true): Promise<TransportistaEntity[]> {
        const transportistas = await prisma.transportista.findMany({
            where: soloActivos ? { activo: true } : {},
            orderBy: { nombre: 'asc' },
        });
        return transportistas.map(TransportistaEntity.fromObject);
    }
}
