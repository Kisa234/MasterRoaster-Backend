import { UpdatePermisoDto } from "../../../dtos/rol/permiso/update";
import { PermisoEntity } from "../../../entities/permiso.entity";
import { PermisoRepository } from "../../../repository/permiso.repository";

export interface UpdatePermisoUseCase {
  execute(id: string, updatePermisoDto: UpdatePermisoDto): Promise<PermisoEntity>;
}

export class UpdatePermiso implements UpdatePermisoUseCase {

  constructor(
    private readonly permisoRepository: PermisoRepository
  ) {}

  async execute(id: string, dto: UpdatePermisoDto): Promise<PermisoEntity> {
    return this.permisoRepository.updatePermiso(id, dto);
  }
}
