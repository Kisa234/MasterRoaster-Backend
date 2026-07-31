import { Router } from 'express';
import { PedidoBolsaController } from './controller';
import { PedidoBolsaDataSourceImpl } from '../../infrastructure/datasources/pedido-bolsa.datasource.impl';
import { PedidoBolsaRepositoryImpl } from '../../infrastructure/repositories/pedido-bolsa.repository.impl';
import { PedidoDataSourceImpl } from '../../infrastructure/datasources/pedido.datasource.impl';
import PedidoRepositoryImpl from '../../infrastructure/repositories/pedido.repository.impl';
import { authMiddleware } from '../../infrastructure/middlewares/auth.middleware';

export class PedidoBolsaRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new PedidoBolsaDataSourceImpl();
        const repository = new PedidoBolsaRepositoryImpl(datasource);

        const pedidoDatasource = new PedidoDataSourceImpl();
        const pedidoRepository = new PedidoRepositoryImpl(pedidoDatasource);

        const controller = new PedidoBolsaController(repository, pedidoRepository);

        // Por pedido
        router.post('/pedido/:id_pedido', authMiddleware, controller.createPedidoBolsa);
        router.get('/pedido/:id_pedido', authMiddleware, controller.getByPedido);

        // Por atributo
        router.get('/gramaje/:gramaje', authMiddleware, controller.getByGramaje);
        router.get('/molienda/:molienda', authMiddleware, controller.getByMolienda);

        // Por id
        router.put('/:id', authMiddleware, controller.updatePedidoBolsa);
        router.delete('/:id', authMiddleware, controller.deletePedidoBolsa);

        return router;
    }
}
