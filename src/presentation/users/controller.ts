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
        console.log('Login request received');
        const email = req.body.email;
        const password = req.body.password;

        new AuthUser(this.userRepository)
            .execute(email, password)
            .then(({ accessToken, refreshToken, user }) => {
                res
                .cookie('refreshToken', refreshToken, {
                      httpOnly: true,
                      secure: process.env.NODE_ENV === 'production',
                      sameSite: 'strict',
                      maxAge: 1 * 24 * 60 * 60 * 1000 // 1 día
                    })                   
                .json({
                    accessToken,
                    refreshToken,
                    user: {
                        id_user: user.id_user,
                        email: user.email,
                        rol: user.rol
                    }
                });
            })
            .catch(error => res.status(400).json({ error: error.message }));
    }

    public refresh = async (req: Request, res: Response) => {
        console.log('Refresh token request received');
        const token = req.cookies?.refreshToken;
        if (!token) return res.status(401).json({ error: 'Refresh token no presente' });

        try {
          const accessToken = new RefreshAccessToken().execute(token);
          return res.json({ accessToken });
        } catch (error: any) {
          return res.status(403).json({ error: error.message });
        }
    };


}