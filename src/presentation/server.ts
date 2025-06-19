import express, { Router } from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors';
import { envs } from '../config/envs'

interface Options{
    port: number;
    router:Router;
    public_path: string;
}

const allowedOrigins = [
  'http://localhost:4200',
  'https://masterroaster.onrender.com'
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
          origin: (origin, callback) => {
            if (!origin || envs.CORS_ORIGINS.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          },
          credentials: true
        }));
    
        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    
        // Rutas
        this.app.use(this.router);
    
        this.app.listen(this.port, () => {
          console.log(`Server is running on port ${this.port}`);
        });
    }

}