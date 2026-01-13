import { CreateRolPermisoDto } from "../../../dtos/rol/rol-permiso/create";
import { RolPermisoEntity } from "../../../entities/rol-permiso.entity";
import { PermisoRepository } from "../../../repository/permiso.repository";
import { RolPermisoRepository } from "../../../repository/rol-permiso.repository";
import { RolRepository } from "../../../repository/rol.repository";

export interface AssignPermisoToRolUseCase {
  execute(createRolPermisoDto: CreateRolPermisoDto): Promise<RolPermisoEntity>;
}

export class AssignPermisoToRol implements AssignPermisoToRolUseCase {

  constructor(
    private readonly rolPermisoRepository: RolPermisoRepository,
    private readonly rolRepository: RolRepository,
    private readonly permisoRepository: PermisoRepository
  ) {}

  async execute(dto: CreateRolPermisoDto): Promise<RolPermisoEntity> {

    // 1️⃣ Validar rol
    const rol = await this.rolRepository.getRolById(dto.id_rol);
    if (!rol) throw new Error('Rol no existe');

    if (!rol.activo) {
      throw new Error('No se puede asignar permisos a un rol inactivo');
    }

    // 2️⃣ Validar permiso
    const permiso = await this.permisoRepository.getPermisoById(dto.id_permiso);
    if (!permiso) throw new Error('Permiso no existe');

    // 3️⃣ Evitar duplicados
    const permisosRol = await this.rolPermisoRepository.getPermisosByRol(dto.id_rol);
    const existe = permisosRol.some(
      rp => rp.id_permiso === dto.id_permiso
    );

    if (existe) {
      throw new Error('El permiso ya está asignado al rol');
    }

    // 4️⃣ Asignar
    return this.rolPermisoRepository.assignPermisoToRol(dto);
  }
}
