import { Encryption } from "../../config/bcrypt";
import { prisma } from "../../data/postgres";
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/create";
import { UpdateUserDto } from '../../domain/dtos/user/update';
import { UserEntity } from "../../domain/entities/user.entity";



export  class UserDataSourceImpl implements UserDataSource {

  async createUser(createUserDto : CreateUserDto): Promise<UserEntity> {
    console.log(createUserDto);
    const newUser = await prisma.user.create({
      data: createUserDto,
    });
    return UserEntity.fromObject(newUser);
  }
  async getUserById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findFirst({
      where: {
        id_user: id,
        eliminado: false
      }
    });
    if (!user) return null;
    return UserEntity.fromObject(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = this.getUserById(id);
    const updatedUser = await prisma.user.update({ 
      where: { id_user: id },
      data: updateUserDto.values
    });
    return UserEntity.fromObject(updatedUser);
  }
  async deleteUser(id: string): Promise<UserEntity> {
    const user = this.getUserById(id);
    const newUser = await prisma.user.update({
      where: {id_user: id},
      data: {eliminado: true}
    });
    return UserEntity.fromObject(newUser);
  }
  async getUsersByRole(role: string): Promise<UserEntity[]> {
    const user = await prisma.user.findMany({
      where: {
        rol: role,
        eliminado: false
      } 
    });
    return user.map(UserEntity.fromObject); 
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) return null;
    return UserEntity.fromObject(user);
  }

  
  async getAllUsers(): Promise<UserEntity[]>{
    const users = await prisma.user.findMany({
      where: {
        eliminado: false
      }
    });
    return users.map(UserEntity.fromObject);
  }

  async getRole(id:string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { id_user: id }
    });
    if (!user) throw new Error("Usuario no encontrado");
    return user.rol;
  }
  
    
}