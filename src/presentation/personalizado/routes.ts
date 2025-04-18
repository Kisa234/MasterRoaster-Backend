import { Router } from "express";
import { PersonalizadoController } from "./controller";

export class PersonalizadoRoutes {
    static get routes() {
        const router = Router();

        const controller = new PersonalizadoController();
        
        router.post('/', controller.getResumenTuesteLotePedido);

        return router;
    }
}