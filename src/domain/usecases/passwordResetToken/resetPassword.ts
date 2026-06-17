import crypto from 'crypto';
import { Encryption } from "../../../config/bcrypt";
import { UserRepository } from "../../repository/user.repository";
import { UpdateUserDto } from "../../dtos/user/update";
import { PasswordResetTokenRepository } from '../../repository/passwordResetToken.repository';

export interface ResetPasswordUseCase {
  execute(token: string, newPassword: string): Promise<void>;
}

export class ResetPassword implements ResetPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository
  ) {}

  async execute(token: string, newPassword: string): Promise<void> {
    if (!token) throw new Error('El token es requerido');
    if (!newPassword || newPassword.length < 6) {
      throw new Error('La nueva contraseña debe tener al menos 6 caracteres');
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const resetToken = await this.passwordResetTokenRepository.findValidByToken(hashedToken);

    if (!resetToken) {
      throw new Error('El enlace de recuperación es inválido, ya fue usado o expiró');
    }

    const hashedPassword = await Encryption.hashPassword(newPassword);

    const [error, dto] = UpdateUserDto.update({
      id_user: resetToken.id_user,
      password: hashedPassword
    });

    if (error || !dto) {
      throw new Error(error ?? 'No se pudo construir el DTO de actualización');
    }

    await this.userRepository.updateUser(resetToken.id_user, dto);
    await this.passwordResetTokenRepository.markAsUsed(resetToken.id_token);
  }
}