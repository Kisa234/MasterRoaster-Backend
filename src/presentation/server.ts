import { create } from 'domain';
import express, { Router } from 'express'
import path from 'path';
import { text } from 'stream/consumers';

interface Options{
    port: number;
    router:Router;
    public_path: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly router: Router;

    constructor(options: Options) {
        const { port, public_path } = options;
        this.port = port;
        this.public_path = public_path;
        this.router = options.router
    }


    async start(){

        // Middlewares
        this.app.use(express.json()); //raw json
        this.app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded

       
        // ROUTES
        this.app.use(this.router);
        
        

        this.app.listen(8080, () => {
            console.log('Server is running on port 8080');
        });

    }

}