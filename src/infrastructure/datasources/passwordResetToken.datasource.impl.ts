import { prisma } from "../../data/postgres";
import { PasswordResetTokenDataSource } from "../../domain/datasources/passwordResetToken.datasource";
import { CreatePasswordResetTokenDto } from "../../domain/dtos/passwordResetToken/create";
import { PasswordResetTokenEntity } from "../../domain/entities/passwordResetToken";

export class PasswordResetTokenDataSourceImpl implements PasswordResetTokenDataSource {

  async create(dto: CreatePasswordResetTokenDto): Promise<PasswordResetTokenEntity> {
    const created = await prisma.passwordResetToken.create({
      data: {
        id_user: dto.id_user,
        token: dto.token,
        fecha_expira: dto.fecha_expira,
        ip_solicitud: dto.ip_solicitud ?? null,
      }
    });
    return PasswordResetTokenEntity.fromObject(created);
  }

  async findValidByToken(token: string): Promise<PasswordResetTokenEntity | null> {
    const found = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        usado: false,
        fecha_expira: { gt: new Date() }
      }
    });
    if (!found) return null;
    return PasswordResetTokenEntity.fromObject(found);
  }

  async markAsUsed(id_token: string): Promise<void> {
    await prisma.passwordResetToken.update({
      where: { id_token },
      data: { usado: true, fecha_usado: new Date() }
    });
  }

  async invalidateAllForUser(id_user: string): Promise<void> {
    await prisma.passwordResetToken.updateMany({
      where: { id_user, usado: false },
      data: { usado: true, fecha_usado: new Date() }
    });
  }
}