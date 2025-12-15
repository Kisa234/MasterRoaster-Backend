import { AuthUser } from './../../domain/usecases/user/auth-user';
import { Request, Response } from 'express';
import { UserRepository } from '../../domain/repository/user.repository';
import { CreateUser } from '../../domain/usecases/user/create-user';
import { CreateUserDto } from '../../domain/dtos/user/create';
import { GetUserById } from '../../domain/usecases/user/get-user';

import { UpdateUser } from '../../domain/usecases/user/update-user';
import { DeleteUser } from '../../domain/usecases/user/delete-user';
import { GetUsersRol } from '../../domain/usecases/user/get-user-rol';
import { UpdateUserDto } from '../../domain/dtos/user/update';

import { envs } from '../../config/envs';
import jwt from "jsonwebtoken";
import { RefreshAccessToken } from '../../domain/usecases/user/refresh-token';




export class UserController {


  // DI
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  public createUser = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    new CreateUser(this.userRepository)
      .execute(createUserDto!)
      .then(user => res.json(user))
      .catch(error => res.status(400).json({ error }));
  }

  public getUserById = async (req: Request, res: Response) => {
    new GetUserById(this.userRepository)
      .execute(req.params.id)
      .then(user => res.json(user))
      .catch(error => res.status(400).json('error aqui'));

  }

  public updateUser = async (req: Request, res: Response) => {
    const user_id = req.params.id;
    const [error, createUserDto] = UpdateUserDto.update({ ...req.body, user_id });
    if (error) {
      return res.status(400).json({ error });
    }
    new UpdateUser(this.userRepository)
      .execute(user_id, createUserDto!)
      .then(user => res.json(user))
      .catch(error => res.status(400).json({ error }));

  }

  public deleteUser = async (req: Request, res: Response) => {
    const user_id = req.params.id;
    new DeleteUser(this.userRepository)
      .execute(user_id)
      .then(user => res.json(user))
      .catch(error => res.status(400).json({ error }));
  }

  public getUsersByRole = async (req: Request, res: Response) => {
    const role = req.params.role;
    new GetUsersRol(this.userRepository)
      .execute(role)
      .then(users => res.json(users))
      .catch(error => res.status(400).json({ error }));
  }

  public getAllUsers = async (req: Request, res: Response) => {
    this.userRepository.getAllUsers()
      .then(users => res.json(users))
      .catch(error => res.status(400).json({ error }));
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;


    try {
      const { accessToken, refreshToken, user } = await new AuthUser(this.userRepository)
        .execute(email, password);

      return res.json({
        accessToken,
        refreshToken,
        user: {
          id_user: user.id_user,
          email: user.email,
          rol: user.rol
        }
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public refresh = async (req: Request, res: Response) => {
    // Ahora esperamos el refreshToken en el body
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token no presente' });
    }

    try {
      const newAccessToken = await new RefreshAccessToken().execute(refreshToken);
      // Opcional: también emitir un nuevo refreshToken si así lo quieres
      return res.json({ accessToken: newAccessToken });
    } catch (error: any) {
      return res.status(403).json({ error: error.message });
    }
  };

  public getSessionInfo = async (req: Request, res: Response) => {
    // authMiddleware ya habrá leído el Bearer token y rellenado req.user
    const user = req.user as { id: string; email: string; rol: string };
    if (!user) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    return res.json({
      id: user.id,
      email: user.email,
      rol: user.rol
    });
  };

  public logout = async (req: Request, res: Response) => {
    try {
      // Limpiar cookies (debes usar los mismos nombres que al setearlas)
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });

      return res.json({ message: 'Logout exitoso' });

    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };




}