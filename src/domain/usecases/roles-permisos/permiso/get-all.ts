import { PermisoEntity } from "../../../entities/permiso.entity";
import { PermisoRepository } from "../../../repository/permiso.repository";

export interface GetAllPermisosUseCase {
  execute(): Promise<PermisoEntity[]>;
}

export class GetAllPermisos implements GetAllPermisosUseCase {

  constructor(
    private readonly permisoRepository: PermisoRepository
  ) {}

  async execute(): Promise<PermisoEntity[]> {
    return this.permisoRepository.getAllPermisos();
  }
}
