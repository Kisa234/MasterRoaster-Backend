import { UpdateUserDto } from "../../dtos/user/update";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";
import { Encryption } from "../../../config/bcrypt";

export interface UpdateUserUseCase {
    execute(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
}

export class UpdateUser implements UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        if (updateUserDto.password) {
            const hashedPassword = await Encryption.hashPassword(updateUserDto.password);

            const [error, dto] = UpdateUserDto.update({
                ...updateUserDto,
                id_user: id,
                password: hashedPassword
            });

            if (error || !dto) {
                throw new Error(error ?? 'No se pudo construir el DTO de actualización');
            }

            return this.userRepository.updateUser(id, dto);
        }

        return this.userRepository.updateUser(id, updateUserDto);
    }
}