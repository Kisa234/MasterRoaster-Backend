import { Router } from "express";
import { PersonalizadoController } from "./controller";
import { PedidoDataSourceImpl } from "../../infrastructure/datasources/pedido.datasource.impl";
import PedidoRepositoryImpl from "../../infrastructure/repositories/pedido.repository.impl";
import { TuesteDataSourceImpl } from "../../infrastructure/datasources/tueste.datasource.impl";
import { TuesteRepositoryImpl } from "../../infrastructure/repositories/tueste.repository.impl";

export class PersonalizadoRoutes {
    static get routes() {
        const router = Router();


        // Pedido
        const PedidoDatasource = new PedidoDataSourceImpl();
        const PedidoRepository = new PedidoRepositoryImpl(PedidoDatasource);
        
        // Tueste
        const TuesteDatasource = new TuesteDataSourceImpl();
        const TuesteRepository = new TuesteRepositoryImpl(TuesteDatasource);
               

        const controller = new PersonalizadoController(
            PedidoRepository,
            TuesteRepository
        );
        
        router.get('/', controller.getResumenTuesteLotePedido);

        return router;
    }
}