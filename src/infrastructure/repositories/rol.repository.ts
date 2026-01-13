import { RolDataSource } from "../../domain/datasources/rol.datasource";
import { CreateRolDto } from "../../domain/dtos/rol/rol/create";
import { UpdateRolDto } from "../../domain/dtos/rol/rol/update";
import { RolEntity } from "../../domain/entities/rol.entity";
import { RolRepository } from "../../domain/repository/rol.repository";

export class RolRepositoryImpl implements RolRepository {

    constructor(
        private readonly datasource: RolDataSource
    ) {}

    createRol(dto: CreateRolDto): Promise<RolEntity> {
        return this.datasource.createRol(dto);
    }

    getRolById(id_rol: string): Promise<RolEntity | null> {
        return this.datasource.getRolById(id_rol);
    }

    updateRol(id_rol: string, dto: UpdateRolDto): Promise<RolEntity> {
        return this.datasource.updateRol(id_rol, dto);
    }

    deleteRol(id_rol: string): Promise<RolEntity> {
        return this.datasource.deleteRol(id_rol);
    }

    getAllRoles(): Promise<RolEntity[]> {
        return this.datasource.getAllRoles();
    }
}
