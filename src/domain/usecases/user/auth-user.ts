import jwt from 'jsonwebtoken';
import { Encryption } from "../../../config/bcrypt";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";
import { envs } from '../../../config/envs';

interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: Omit<UserEntity, 'password'>;
}

export interface AuthUserUseCase {
  execute(email: string, password: string): Promise<AuthResult>;
}

export class AuthUser implements AuthUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(email: string, password: string): Promise<AuthResult> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const valid = await Encryption.comparePassword(password, user.password);
    if (!valid) throw new Error('Contraseña incorrecta');

    const accessToken = jwt.sign(
      { id: user.id_user, email: user.email, rol: user.rol },
      envs.JWT_SECRET,
      { expiresIn: '15m' }
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
