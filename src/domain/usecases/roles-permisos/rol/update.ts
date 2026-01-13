import { UpdateRolDto } from "../../../dtos/rol/rol/update";
import { RolEntity } from "../../../entities/rol.entity";
import { RolRepository } from "../../../repository/rol.repository";

export interface UpdateRolUseCase {
  execute(id: string, updateRolDto: UpdateRolDto): Promise<RolEntity>;
}

export class UpdateRol implements UpdateRolUseCase {

  constructor(  
    private readonly rolRepository: RolRepository
  ) {}

  async execute(id: string, dto: UpdateRolDto): Promise<RolEntity> {
    return this.rolRepository.updateRol(id, dto);
  }
}
