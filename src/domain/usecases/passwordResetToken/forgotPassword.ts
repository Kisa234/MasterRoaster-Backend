import crypto from 'crypto';
import { UserRepository } from "../../repository/user.repository";
import { PasswordResetTokenRepository } from "../../repository/passwordResetToken.repository";
import { CreatePasswordResetTokenDto } from "../../dtos/passwordResetToken/create";
import { envs } from "../../../config/envs";
import { EmailService } from '../../../config/email';

export interface ForgotPasswordUseCase {
  execute(email: string, ip?: string): Promise<void>;
}

export class ForgotPassword implements ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
    private readonly emailService: EmailService
  ) {}

  async execute(email: string, ip?: string): Promise<void> {
    if (!email) throw new Error('El email es requerido');

    const user = await this.userRepository.findByEmail(email);

    // No revelamos si el correo existe o no, por seguridad
    if (!user || user.eliminado) return;

    // Invalida cualquier token anterior sin usar, así solo el último enlace enviado es válido
    await this.passwordResetTokenRepository.invalidateAllForUser(user.id_user);

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    const [error, dto] = CreatePasswordResetTokenDto.create({
      id_user: user.id_user,
      token: hashedToken,
      fecha_expira: expires,
      ip_solicitud: ip
    });

    if (error || !dto) throw new Error(error ?? 'No se pudo crear el token de recuperación');

    await this.passwordResetTokenRepository.create(dto);

    const resetLink = `${envs.FRONTEND_URL}/reset-password?token=${rawToken}`;
    await this.emailService.sendPasswordResetEmail(user.email, user.nombre, resetLink);
  }
}