import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

export interface AuthUserUseCase {
    execute(email: string, password: string): Promise<UserEntity | null>;
}

export class AuthUser implements AuthUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(email: string, password: string): Promise<UserEntity | null> {
        return this.userRepository.authUser(email, password);
    }
}