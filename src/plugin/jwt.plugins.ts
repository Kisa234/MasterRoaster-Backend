import  jwt from "jsonwebtoken";

export class Jwt {
    private secretKey: string;
    
    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY!;
    }

    

    public generateToken(id:string, mail:string): string {
        return jwt.sign(
            {id,mail},
            this.secretKey, 
            {
                expiresIn: '1h' 
            });
    }

    
    

}