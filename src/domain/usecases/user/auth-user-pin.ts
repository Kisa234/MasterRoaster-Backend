import jwt from 'jsonwebtoken';
import { Encryption } from '../../../config/bcrypt';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repository/user.repository';
import { envs } from '../../../config/envs';

interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: Omit<UserEntity, 'password'>;
}

export interface AuthUserByPinUseCase {
  execute(documento_identidad: string, pin: string): Promise<AuthResult>;
}

export class AuthUserByPin implements AuthUserByPinUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(documento_identidad: string, pin: string): Promise<AuthResult> {
    const user = await this.userRepository.findByDocumento(documento_identidad);
    if (!user) throw new Error('Usuario no encontrado');

    if (user.rol === 'cliente') throw new Error('No tienes permisos para acceder');
    if (user.eliminado) throw new Error('Usuario no activo o eliminado');

    const valid = await Encryption.comparePassword(pin, user.password);
    if (!valid) throw new Error('PIN incorrecto');

    const accessToken = jwt.sign(
      { id: user.id_user, email: user.email, rolId: user.id_rol, rol: user.rol },
      envs.JWT_SECRET,
      { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
      { id: user.id_user },
      envs.JWT_REFRESH_SECRET,
      { expiresIn: '1d' }
    );

    const { password: _, ...userData } = user;
    return { accessToken, refreshToken, user: userData };
  }
}