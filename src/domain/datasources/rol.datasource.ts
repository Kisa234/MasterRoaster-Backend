import { CreateRolDto } from "../dtos/rol/rol/create";
import { UpdateRolDto } from "../dtos/rol/rol/update";
import { RolEntity } from "../entities/rol.entity";


export abstract class RolDataSource {

    abstract createRol(createRolDto: CreateRolDto): Promise<RolEntity>;

    abstract getRolById(id: string): Promise<RolEntity | null>;

    abstract updateRol(id: string, updateRolDto: UpdateRolDto): Promise<RolEntity>;

    abstract deleteRol(id: string): Promise<RolEntity>;

    abstract getAllRoles(): Promise<RolEntity[]>;
}
