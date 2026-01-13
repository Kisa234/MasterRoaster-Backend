import { prisma } from "../../data/postgres";
import { RolPermisoEntity } from "../../domain/entities/rol-permiso.entity";
import { CreateRolPermisoDto } from "../../domain/dtos/rol/rol-permiso/create";
import { RolPermisoDataSource } from "../../domain/datasources/rol-permiso.datasource";

export class RolPermisoDataSourceImpl implements RolPermisoDataSource {

    async assignPermisoToRol(createRolPermisoDto: CreateRolPermisoDto): Promise<RolPermisoEntity> {
        const rolPermiso = await prisma.rolPermiso.create({
            data: createRolPermisoDto
        });
        return RolPermisoEntity.fromObject(rolPermiso);
    }

    async removePermisoFromRol(id_rol: string, id_permiso: string): Promise<RolPermisoEntity> {
        const rolPermiso = await prisma.rolPermiso.delete({
            where: {
                id_rol_id_permiso: {
                    id_rol,
                    id_permiso
                }
            }
        });
        return RolPermisoEntity.fromObject(rolPermiso);
    }

    async getPermisosByRol(id_rol: string): Promise<RolPermisoEntity[]> {
        const permisos = await prisma.rolPermiso.findMany({
            where: {
                id_rol: id_rol
            }
        });
        return permisos.map(p => RolPermisoEntity.fromObject(p));
    }
}
