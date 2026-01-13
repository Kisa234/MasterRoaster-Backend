import { RolEntity } from "../../../entities/rol.entity";
import { RolRepository } from "../../../repository/rol.repository";

export interface GetAllRolesUseCase {
  execute(): Promise<RolEntity[]>;
}

export class GetAllRoles implements GetAllRolesUseCase {

  constructor(
    private readonly rolRepository: RolRepository
  ) {}

  async execute(): Promise<RolEntity[]> {
    return this.rolRepository.getAllRoles();
  }
}
