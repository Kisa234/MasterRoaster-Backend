import { Request, Response } from 'express';
import { UserRepository } from '../../domain/repository/user.repository';
import { CreateUser } from '../../domain/usecases/user/create-user';
import { CreateUserDto } from '../../domain/dtos/user/create';
import { GetUser } from '../../domain/usecases/user/get-user';

import { UpdateUser } from '../../domain/usecases/user/update-user';
import { DeleteUser } from '../../domain/usecases/user/delete-user';
import { GetUsersRol } from '../../domain/usecases/user/get-user-rol';
import { UpdateUserDto } from '../../domain/dtos/user/update';



export class UserController {
   
    
    // DI
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    public createUser = async (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateUser(this.userRepository)
            .execute(createUserDto!)
            .then( user => res.json(user))
            .catch( error => res.status(400).json({ error }));
    }
    public getUserById = async (req: Request, res: Response) => {
        new GetUser(this.userRepository)
            .execute(req.params.id)
            .then( user => res.json(user))
            .catch( error => res.status(400).json({ error }));

    }
    public updateUser = async (req: Request, res: Response) => {
        const user_id = req.params.id;
        const [error, createUserDto] = UpdateUserDto.update({...req.body,user_id});
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateUser(this.userRepository)
            .execute(user_id,createUserDto!)
            .then( user => res.json(user))
            .catch( error => res.status(400).json({ error }));

    }
    public deleteUser = async (req: Request, res: Response) => {
        const user_id = req.params.id;
        new DeleteUser(this.userRepository)
            .execute(user_id)
            .then( user => res.json(user))
            .catch( error => res.status(400).json({ error }));
    }
    public getUsersByRole = async (req: Request, res: Response) => {
        const role = req.params.role;
        new GetUsersRol(this.userRepository)
            .execute(role)
            .then( users => res.json(users))
            .catch( error => res.status(400).json({ error}));
    }

}