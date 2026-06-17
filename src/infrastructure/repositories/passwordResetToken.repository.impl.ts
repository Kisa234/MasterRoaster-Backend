import { PasswordResetTokenDataSource } from "../../domain/datasources/passwordResetToken.datasource";
import { CreatePasswordResetTokenDto } from "../../domain/dtos/passwordResetToken/create";
import { PasswordResetTokenEntity } from "../../domain/entities/passwordResetToken";
import { PasswordResetTokenRepository } from "../../domain/repository/passwordResetToken.repository";

export class PasswordResetTokenRepositoryImpl implements PasswordResetTokenRepository {

  constructor(
    private readonly datasource: PasswordResetTokenDataSource
  ) {}

  create(dto: CreatePasswordResetTokenDto): Promise<PasswordResetTokenEntity> {
    return this.datasource.create(dto);
  }
  findValidByToken(token: string): Promise<PasswordResetTokenEntity | null> {
    return this.datasource.findValidByToken(token);
  }
  markAsUsed(id_token: string): Promise<void> {
    return this.datasource.markAsUsed(id_token);
  }
  invalidateAllForUser(id_user: string): Promise<void> {
    return this.datasource.invalidateAllForUser(id_user);
  }
}