import { CreatePasswordResetTokenDto } from '../dtos/passwordResetToken/create';
import { PasswordResetTokenEntity } from './../entities/passwordResetToken';

export abstract class PasswordResetTokenDataSource {
  abstract create(dto: CreatePasswordResetTokenDto): Promise<PasswordResetTokenEntity>;
  abstract findValidByToken(token: string): Promise<PasswordResetTokenEntity | null>;
  abstract markAsUsed(id_token: string): Promise<void>;
  abstract invalidateAllForUser(id_user: string): Promise<void>;
}