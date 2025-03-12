import { CreateUserDto, UpdateUserDto, UserEntity } from "../../domain";
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { UserRepository } from "../../domain/repository/user.repository";


export class UserRepositoryImpl implements UserRepository {

  constructor(
    private readonly datasource: UserDataSource
  ){}
  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.datasource.createUser(createUserDto);
  }
  getUserById(id: string): Promise<UserEntity | null> {
    return this.datasource.getUserById(id);
  }
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.datasource.updateUser(id, updateUserDto);
  }
  deleteUser(id: string): Promise<UserEntity> {
    return this.datasource.deleteUser(id);
  }
  getUsersByRole(role: string): Promise<UserEntity[]> {
    return this.datasource.getUsersByRole(role);
  }

  
    
}