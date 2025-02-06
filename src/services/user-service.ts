import { bcrypt } from '../plugin/bcrypt.plugin';
import { uuid } from "../plugin/uuid.plugin";
import { Usuarios } from '../interfaces/Usuarios.interface';

export class UserService {
    
    // CREATE USER
    hash: bcrypt = new bcrypt();

    // CREATE USER
    async createUser(user: Usuarios, password:string): Promise<Usuarios> {
        user.id_usuario = uuid.generate();
        user.contrasena_hash = await this.hash.hashPassword(password);
        user.eliminado = false;
        return user;
    }
        
    //VALIDATE PASSWORD
    async validatePassword(password: string, hash: string): Promise<boolean> {
        return this.hash.comparePassword(password, hash);
    }

    //CHANGE PASSWORD
    async changePassword(user: Usuarios, password: string): Promise<Usuarios> {
        user.contrasena_hash = await this.hash.hashPassword(password);
        return user;
    }

    //DELETE USER
    async deleteUser(user: Usuarios): Promise<Usuarios> {
        user.eliminado = true;
        return user;
    }

    //UPDATE USER
    async updateUser(user: Usuarios): Promise<Usuarios> {
        return user;
    }

    //GET USER BY MAIL
    getUserByMail(mail: string): Usuarios|undefined {
        
        return undefined;
    }
     
    
    
}