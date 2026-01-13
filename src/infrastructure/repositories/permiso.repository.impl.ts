import { PermisoDataSource } from "../../domain/datasources/permiso.datasource";
import { CreatePermisoDto } from "../../domain/dtos/rol/permiso/create";
import { UpdatePermisoDto } from "../../domain/dtos/rol/permiso/update";
import { PermisoEntity } from "../../domain/entities/permiso.entity";
import { PermisoRepository } from "../../domain/repository/permiso.repository";

export class PermisoRepositoryImpl implements PermisoRepository {

    constructor(
        private readonly datasource: PermisoDataSource
    ) {}

    createPermiso(dto: CreatePermisoDto): Promise<PermisoEntity> {
        return this.datasource.createPermiso(dto);
    }

    getPermisoById(id_permiso: string): Promise<PermisoEntity | null> {
        return this.datasource.getPermisoById(id_permiso);
    }

    updatePermiso(id_permiso: string, dto: UpdatePermisoDto): Promise<PermisoEntity> {
        return this.datasource.updatePermiso(id_permiso, dto);
    }

    deletePermiso(id_permiso: string): Promise<PermisoEntity> {
        return this.datasource.deletePermiso(id_permiso);
    }

    getAllPermisos(): Promise<PermisoEntity[]> {
        return this.datasource.getAllPermisos();
    }
}
