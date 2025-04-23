import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

export interface GetAllUserUseCase{
    execute(): Promise<{id_user: string, name: string}[]>;
};

export class GetAllUsers implements GetAllUserUseCase{
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(): Promise<{id_user: string, name: string}[]>{ 
        return this.userRepository.getAllUsers();
    }
}