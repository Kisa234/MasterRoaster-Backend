import { CreateRolPermisoDto } from "../dtos/rol/rol-permiso/create";
import { RolPermisoEntity } from "../entities/rol-permiso.entity";


export abstract class RolPermisoRepository {

    abstract assignPermisoToRol(createRolPermisoDto: CreateRolPermisoDto): Promise<RolPermisoEntity>;

    abstract removePermisoFromRol(id_rol: string, id_permiso: string): Promise<RolPermisoEntity>;

    abstract getPermisosByRol(id_rol: string): Promise<RolPermisoEntity[]>;
}
