import express, { Router } from 'express'
import cors from 'cors';

interface Options{
    port: number;
    router:Router;
    public_path: string;
}

const allowedOrigins = [
  'http://localhost:4200',
  'https://roastsync-upkm.onrender.com'
];

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


   async start() {
        // CORS configurado correctamente
        this.app.use(cors({
          origin: allowedOrigins,
          allowedHeaders: ['Content-Type','Authorization'],
        }));
    
        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    
        // Rutas
        this.app.use(this.router);
    
        this.app.listen(this.port, () => {
          console.log(`Server is running on port ${this.port}`);
        });
    }

}