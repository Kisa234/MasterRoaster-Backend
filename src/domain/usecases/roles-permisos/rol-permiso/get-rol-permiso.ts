import { CreateRolPermisoDto } from "../../../dtos/rol/rol-permiso/create";
import { RolPermisoEntity } from "../../../entities/rol-permiso.entity";
import { RolPermisoRepository } from "../../../repository/rol-permiso.repository";

export interface GetPermisosByRolUseCase {
  execute(id_rol: string): Promise<RolPermisoEntity[]>;
}

export class GetPermisosByRol implements GetPermisosByRolUseCase  {
  constructor(
    private readonly rolPermisoRepository: RolPermisoRepository,
  ) {}

  async execute(id_rol: string): Promise<RolPermisoEntity[]> {
    return this.rolPermisoRepository.getPermisosByRol(id_rol);
  }
}
