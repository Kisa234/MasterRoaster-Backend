import { User } from "../interfaces/user.interface";

export interface IUserRepository {
    getById(id: string): Promise<User | null>;
    getAll(): Promise<User[]>;
    create(user: User): Promise<User>;
    update(id: string, user: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    
    register(user: User): Promise<User>; 
    login(email: string, password: string): Promise<string | null>;  
}
