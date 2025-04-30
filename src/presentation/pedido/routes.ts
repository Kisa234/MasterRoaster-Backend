import { Router } from 'express';
import { PedidoController } from './controller';
import { PedidoDataSourceImpl } from '../../infrastructure/datasources/pedido.datasource.impl';
import PedidoRepositoryImpl from '../../infrastructure/repositories/pedido.repository.impl';
import { LoteDataSourceImpl } from '../../infrastructure/datasources/lote.datasource.impl';
import { LoteRepositoryImpl } from '../../infrastructure/repositories/lote.repository.impl';
import { TuesteDataSourceImpl } from '../../infrastructure/datasources/tueste.datasource.impl';
import { TuesteRepositoryImpl } from '../../infrastructure/repositories/tueste.repository.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UserDataSourceImpl } from '../../infrastructure/datasources/user.datasource.impl';
import { CreateLote } from '../../domain/usecases/lote/lote/create-lote';

export class PedidoRoutes {


    static get routes():Router {

        const router = Router();

        // Inyección de dependencias
        // Pedido
        const PedidoDatasource = new PedidoDataSourceImpl();
        const PedidoRepository = new PedidoRepositoryImpl(PedidoDatasource);
        // Lote
        const LoteDatasource = new LoteDataSourceImpl();
        const LoteLoteRepository = new LoteRepositoryImpl(LoteDatasource);
        // Tueste
        const TuesteDatasource = new TuesteDataSourceImpl();
        const TuesteRepository = new TuesteRepositoryImpl(TuesteDatasource);
        // User
        const Userdatasource = new UserDataSourceImpl();
        const UserRepository = new UserRepositoryImpl(Userdatasource);
        
        const cl = new CreateLote(LoteLoteRepository, UserRepository)

        const controller = new PedidoController(
            PedidoRepository,
            LoteLoteRepository,
            UserRepository,
            TuesteRepository,
            cl
        );

        // Definición de rutas
        router.post('/', controller.createPedido);
        router.get('/', controller.getAllPedidos);
        router.get('/:id', controller.getPedidoById);
        router.put('/:id', controller.updatePedido);
        router.delete('/:id', controller.deletePedido);

        router.get('/estado/:estado', controller.getPedidosByEstado);
        router.get('/cliente/:cliente_id', controller.getPedidosByCliente);
        router.put('/completar/:id', controller.completarPedido);
        
        return router;

    }
}