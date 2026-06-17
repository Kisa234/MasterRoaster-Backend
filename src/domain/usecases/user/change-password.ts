import { Encryption } from "../../../config/bcrypt";
import { UserRepository } from "../../repository/user.repository";
import { UpdateUserDto } from "../../dtos/user/update";

export interface ChangePasswordUseCase {
    execute(id_user: string, currentPassword: string, newPassword: string): Promise<void>;
}

export class ChangePassword implements ChangePasswordUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(id_user: string, currentPassword: string, newPassword: string): Promise<void> {
        if (!currentPassword || !newPassword) {
            throw new Error('La contraseña actual y la nueva contraseña son requeridas');
        }

        if (newPassword.length < 6) {
            throw new Error('La nueva contraseña debe tener al menos 6 caracteres');
        }

        const user = await this.userRepository.getUserById(id_user);
        if (!user) throw new Error('Usuario no encontrado');

        const valid = await Encryption.comparePassword(currentPassword, user.password);
        if (!valid) throw new Error('La contraseña actual es incorrecta');

        const hashedPassword = await Encryption.hashPassword(newPassword);

        const [error, dto] = UpdateUserDto.update({
            id_user,
            password: hashedPassword
        });

        if (error || !dto) {
            throw new Error(error ?? 'No se pudo construir el DTO de actualización');
        }

        await this.userRepository.updateUser(id_user, dto);
    }
}