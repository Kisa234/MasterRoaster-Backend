import { CreatePermisoDto } from "../../../dtos/rol/permiso/create";
import { PermisoEntity } from "../../../entities/permiso.entity";
import { PermisoRepository } from "../../../repository/permiso.repository";

export interface CreatePermisoUseCase {
  execute(dto: CreatePermisoDto): Promise<PermisoEntity>;
}

export class CreatePermiso implements CreatePermisoUseCase {

  constructor(
    private readonly permisoRepository: PermisoRepository
  ) {}

  async execute(dto: CreatePermisoDto): Promise<PermisoEntity> {
    return this.permisoRepository.createPermiso(dto);
  }
}
