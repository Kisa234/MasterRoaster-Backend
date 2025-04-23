import { CreateUserDto } from "../dtos/user/create";
import { UpdateUserDto } from "../dtos/user/update";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDataSource {
    abstract createUser(createUserDto : CreateUserDto): Promise<UserEntity>;
    abstract getUserById(id: string): Promise<UserEntity | null>;
    abstract updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    abstract deleteUser(id: string): Promise<UserEntity>;
    abstract getUsersByRole(role: string): Promise<UserEntity[]>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract authUser(email: string, password: string): Promise<UserEntity | null>;
    abstract getAllUsers(): Promise<{id_user: string, name: string}[]>;
  }