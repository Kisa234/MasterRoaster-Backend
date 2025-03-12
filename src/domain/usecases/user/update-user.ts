import { UpdateUserDto } from "../../dtos/user/update";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

export interface UpdateUserUseCase {
    execute(id: string , updateUserDto: UpdateUserDto): Promise<UserEntity>;
}

export class UpdateUser implements UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.userRepository.updateUser(id, updateUserDto);
    }
}