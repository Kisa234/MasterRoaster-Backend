import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

export interface GetUsersRolUseCase {
    execute(rol:string): Promise<UserEntity[]>;
}

export class GetUsersRol implements GetUsersRolUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(rol: string): Promise<UserEntity[]> {
        return this.userRepository.getUsersByRole(rol);
    }
}