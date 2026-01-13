import { prisma } from "../../data/postgres";
import { RolEntity } from "../../domain/entities/rol.entity";
import { CreateRolDto } from "../../domain/dtos/rol/rol/create";
import { UpdateRolDto } from "../../domain/dtos/rol/rol/update";
import { RolDataSource } from "../../domain/datasources/rol.datasource";

export class RolDataSourceImpl implements RolDataSource {

    async createRol(createRolDto: CreateRolDto): Promise<RolEntity> {
        const rol = await prisma.rol.create({
            data: createRolDto
        });
        return RolEntity.fromObject(rol);
    }

    async getRolById(id: string): Promise<RolEntity | null> {
        const rol = await prisma.rol.findFirst({
            where: {
                id_rol: id
            }
        });
        if (!rol) return null;
        return RolEntity.fromObject(rol);
    }

    async updateRol(id: string, updateRolDto: UpdateRolDto): Promise<RolEntity> {
        const rol = await prisma.rol.update({
            where: { id_rol: id },
            data: updateRolDto.values
        });
        return RolEntity.fromObject(rol);
    }

    async deleteRol(id: string): Promise<RolEntity> {
        const rol = await prisma.rol.update({
            where: { id_rol: id },
            data: { activo: false }
        });
        return RolEntity.fromObject(rol);
    }

    async getAllRoles(): Promise<RolEntity[]> {
        const roles = await prisma.rol.findMany({
            orderBy: {
                created_at: 'asc'
            }
        });
        return roles.map(r => RolEntity.fromObject(r));
    }
}
