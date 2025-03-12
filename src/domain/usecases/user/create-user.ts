import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";
import { CreateUserDto } from '../../dtos/user/create';

export interface CreateUserUseCase {
    execute(createUserDto: CreateUserDto): Promise<UserEntity>;
}

export class CreateUser implements CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute( createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userRepository.createUser(createUserDto);
    }
}