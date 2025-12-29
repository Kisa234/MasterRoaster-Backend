import { CreatePermisoDto } from "../dtos/rol/permiso/create";
import { UpdatePermisoDto } from "../dtos/rol/permiso/update";
import { PermisoEntity } from "../entities/permiso.entity";


export abstract class PermisoRepository {

    abstract createPermiso(createPermisoDto: CreatePermisoDto): Promise<PermisoEntity>;

    abstract getPermisoById(id: string): Promise<PermisoEntity | null>;

    abstract updatePermiso(id: string, updatePermisoDto: UpdatePermisoDto): Promise<PermisoEntity>;

    abstract deletePermiso(id: string): Promise<PermisoEntity>;

    abstract getAllPermisos(): Promise<PermisoEntity[]>;
}
