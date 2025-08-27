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
import { LoteTostadoRoutes } from "./lote-tostado/routes";
import { HistorialRoutes } from "./historial/routes";
import { PersonalizadoRoutes } from "./personalizado/routes";
import { AnalisisDefectosRoutes } from "./analisisDefectos/routes";
import { VariedadRoutes } from "./variedad/routes";
import { EnvioRoutes } from "./envio/routes";
import { NotasRoutes } from "./notas/routes";
import { ProductoSkuRoutes } from "./productoSku/routes";
import { ProductoRoutes } from "./producto/routes";
import { FichaEnvioRoutes } from "./fichaEnvio/routes";


export class AppRoutes{

    static get routes():Router{
        const router = Router();

        router.use('/analisis', AnalisisRoutes.routes);
        router.use('/analisisFisico', AnalisisFisicoRoutes.routes);
        router.use('/analisisRapido', AnalisisRapidoRoutes.routes);
        router.use('/analisisSensorial', AnalisisSensorialRoutes.routes);
        router.use('/analisisDefectos', AnalisisDefectosRoutes.routes);

        router.use('/lote', LoteRoutes.routes);
        router.use('/loteTostado', LoteTostadoRoutes.routes);
        router.use('/muestra', MuestraRoutes.routes);

        router.use('/producto', ProductoRoutes.routes);
        router.use('/sku', ProductoSkuRoutes.routes);

        router.use('/variedad', VariedadRoutes.routes);
        router.use('/notas', NotasRoutes.routes);

        router.use('/pedido', PedidoRoutes.routes);
        router.use('/tueste', TuesteRoutes.routes);
        
        router.use('/envio', EnvioRoutes.routes);
        router.use('/fichaEnvio',FichaEnvioRoutes.routes);

        router.use('/historial', HistorialRoutes.routes);
        router.use('/user', UserRoutes.routes); 
        router.use('/p', PersonalizadoRoutes.routes);  

        
        

        return router;
    }


}