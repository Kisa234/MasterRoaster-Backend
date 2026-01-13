import { RolPermisoDataSource } from "../../domain/datasources/rol-permiso.datasource";
import { CreateRolPermisoDto } from "../../domain/dtos/rol/rol-permiso/create";
import { RolPermisoEntity } from "../../domain/entities/rol-permiso.entity";
import { RolPermisoRepository } from "../../domain/repository/rol-permiso.repository";

export class RolPermisoRepositoryImpl implements RolPermisoRepository {

    constructor(
        private readonly datasource: RolPermisoDataSource
    ) {}

    assignPermisoToRol(dto: CreateRolPermisoDto): Promise<RolPermisoEntity> {
        return this.datasource.assignPermisoToRol(dto);
    }

    removePermisoFromRol(id_rol: string, id_permiso: string): Promise<RolPermisoEntity> {
        return this.datasource.removePermisoFromRol(id_rol, id_permiso);
    }

    getPermisosByRol(id_rol: string): Promise<RolPermisoEntity[]> {
        return this.datasource.getPermisosByRol(id_rol);
    }
}
