import { Router } from "express";
import { PedidoItemController } from "./controller";
import { PedidoItemDataSourceImpl } from "../../infrastructure/datasources/pedido-item.datasource.impl";
import { PedidoItemRepositoryImpl } from "../../infrastructure/repositories/pedido-item.repository.impl";

// Nota: PedidoItem se crea/borra siempre a través del ciclo de vida del
// Pedido (create-pedido.ts / completar-pedido.ts), igual que PedidoBolsa.
// Estas rutas son de solo lectura — si tu PedidoBolsaRoutes real expone
// algo más (ej. update manual de un item), avisá para agregarlo acá también.

export class PedidoItemRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new PedidoItemDataSourceImpl();
        const repository = new PedidoItemRepositoryImpl(datasource);
        const controller = new PedidoItemController(repository);

        router.get('/pedido/:id_pedido', controller.getByPedido);

        return router;
    }
}
