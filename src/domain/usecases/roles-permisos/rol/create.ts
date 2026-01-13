import { CreateRolDto } from "../../../dtos/rol/rol/create";
import { RolEntity } from "../../../entities/rol.entity";
import { RolRepository } from "../../../repository/rol.repository";

export interface CreateRolUseCase {
  execute(dto: CreateRolDto): Promise<RolEntity>;
}

export class CreateRol implements CreateRolUseCase {

  constructor(
    private readonly rolRepository: RolRepository
  ) {}

  async execute(dto: CreateRolDto): Promise<RolEntity> {
    return this.rolRepository.createRol(dto);
  }
}
