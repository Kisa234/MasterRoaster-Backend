import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

export interface GetUserUsecase{
    execute(id: string): Promise<UserEntity| null>;
};

export class GetUser implements GetUserUsecase{
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(id: string): Promise<UserEntity| null>{ 
        return this.userRepository.getUserById(id);
    }
}