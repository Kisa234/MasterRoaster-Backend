import { Router } from "express";
import { AnalisisRoutes } from "./analisis/routes";
import { AnalisisFisicoRoutes } from "./analisisFisico/routes";
import {AnalisisRapidoRoutes} from "./analisisRapido/routes";
import { AnalisisSensorialRoutes } from "./analisisSensorial/routes";
import { LoteRoutes } from "./lote/routes";
import { MuestraRoutes } from "./muestra/routes";
import  { TuesteRoutes } from "./tueste/routes";
import { UserRoutes } from "./users/routes";
import { PedidoRoutes } from "./pedido/routes";


export class AppRoutes{

    static get routes():Router{
        const router = Router();

        router.use('/analisis', AnalisisRoutes.routes);
        router.use('/analisisFisico', AnalisisFisicoRoutes.routes);
        router.use('/analisisRapido', AnalisisRapidoRoutes.routes);
        router.use('/analisisSensorial', AnalisisSensorialRoutes.routes);
        router.use('/lote', LoteRoutes.routes);
        router.use('/muestra', MuestraRoutes.routes);
        router.use('/pedido', PedidoRoutes.routes);
        // router.use('/tueste', TuesteRoutes.routes);
        router.use('/user', UserRoutes.routes);  

        

        return router;
    }


}