
import { compare, hash } from 'bcrypt';


export class bcrypt {

  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
  
}