import { prisma } from "../../data/postgres";
import { PermisoEntity } from "../../domain/entities/permiso.entity";
import { CreatePermisoDto } from "../../domain/dtos/rol/permiso/create";
import { UpdatePermisoDto } from "../../domain/dtos/rol/permiso/update";
import { PermisoDataSource } from "../../domain/datasources/permiso.datasource";

export class PermisoDataSourceImpl implements PermisoDataSource {

    async createPermiso(createPermisoDto: CreatePermisoDto): Promise<PermisoEntity> {
        const permiso = await prisma.permiso.create({
            data: createPermisoDto
        });
        return PermisoEntity.fromObject(permiso);
    }

    async getPermisoById(id: string): Promise<PermisoEntity | null> {
        const permiso = await prisma.permiso.findFirst({
            where: {
                id_permiso: id
            }
        });
        if (!permiso) return null;
        return PermisoEntity.fromObject(permiso);
    }

    async updatePermiso(id: string, updatePermisoDto: UpdatePermisoDto): Promise<PermisoEntity> {
        const permiso = await prisma.permiso.update({
            where: { id_permiso: id },
            data: updatePermisoDto.values
        });
        return PermisoEntity.fromObject(permiso);
    }

    async deletePermiso(id: string): Promise<PermisoEntity> {
        const permiso = await prisma.permiso.delete({
            where: { id_permiso: id }
        });
        return PermisoEntity.fromObject(permiso);
    }

    async getAllPermisos(): Promise<PermisoEntity[]> {
        const permisos = await prisma.permiso.findMany({
            orderBy: {
                created_at: 'asc'
            }
        });
        return permisos.map(p => PermisoEntity.fromObject(p));
    }
}
