import { UpdateUserDto } from "../../dtos/user/update";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

export interface AssignRoleToUserUseCase {
    execute(id_user: string , id_rol: string): Promise<UserEntity>;
}

export class AssignRoleToUser implements AssignRoleToUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(id_user: string, id_rol: string): Promise<UserEntity> {
        return this.userRepository.assignRoleToUser(id_user, id_rol);
    }
}