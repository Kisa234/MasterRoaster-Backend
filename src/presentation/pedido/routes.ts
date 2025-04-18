import { Router } from 'express';
import { PedidoController } from './controller';
import { PedidoDataSourceImpl } from '../../infrastructure/datasources/pedido.datasource.impl';
import PedidoRepositoryImpl from '../../infrastructure/repositories/pedido.repository.impl';

export class PedidoRoutes {


    static get routes():Router {

        const router = Router();

        // Inyección de dependencias
        const datasource = new PedidoDataSourceImpl();
        const repository = new PedidoRepositoryImpl(datasource);
        const controller = new PedidoController(repository);

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