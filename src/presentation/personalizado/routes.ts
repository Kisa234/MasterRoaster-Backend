import { LoteDataSourceImpl } from './../../infrastructure/datasources/lote.datasource.impl';
import { Router } from "express";
import { PersonalizadoController } from "./controller";
import { PedidoDataSourceImpl } from "../../infrastructure/datasources/pedido.datasource.impl";
import PedidoRepositoryImpl from "../../infrastructure/repositories/pedido.repository.impl";
import { TuesteDataSourceImpl } from "../../infrastructure/datasources/tueste.datasource.impl";
import { TuesteRepositoryImpl } from "../../infrastructure/repositories/tueste.repository.impl";
import { LoteRepositoryImpl } from '../../infrastructure/repositories/lote.repository.impl';
import { UserDataSourceImpl } from '../../infrastructure/datasources/user.datasource.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';

export class PersonalizadoRoutes {
    static get routes() {
        const router = Router();


        // Pedido
        const PedidoDatasource = new PedidoDataSourceImpl();
        const PedidoRepository = new PedidoRepositoryImpl(PedidoDatasource);
        
        // Tueste
        const TuesteDatasource = new TuesteDataSourceImpl();
        const TuesteRepository = new TuesteRepositoryImpl(TuesteDatasource);

        // Lote
        const LoteDataSource = new LoteDataSourceImpl();
        const LoteRepository = new LoteRepositoryImpl(LoteDataSource);

        // User
        const UserDatasource = new UserDataSourceImpl();
        const UserRepository = new UserRepositoryImpl(UserDatasource);
        
               

        const controller = new PersonalizadoController(
            PedidoRepository,
            TuesteRepository,
            LoteRepository,
            UserRepository
        );
        
        router.get('/', controller.getResumenTuesteLotePedido);
        router.get('/tueste/pendientes', controller.getTuestesPendientes);
        router.get('/pedidos/ultimos', controller.getUltimosPedidos);
        router.get('/stock/lotes', controller.getStockTotal);
        router.get('/lotes/clasificacion', controller.getPesoPorClasificacion);

        return router;
    }
}