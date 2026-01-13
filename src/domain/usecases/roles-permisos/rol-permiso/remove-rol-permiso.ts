import { RolPermisoEntity } from "../../../entities/rol-permiso.entity";
import { RolPermisoRepository } from "../../../repository/rol-permiso.repository";

export interface RemovePermisoFromRolUseCase {
  execute(id_rol: string, id_permiso: string): Promise<RolPermisoEntity>;
}

export class RemovePermisoFromRol implements RemovePermisoFromRolUseCase {

  constructor(
    private readonly rolPermisoRepository: RolPermisoRepository
  ) {}

  async execute(id_rol: string, id_permiso: string): Promise<RolPermisoEntity> {

    return this.rolPermisoRepository.removePermisoFromRol(id_rol, id_permiso);
  }
}
