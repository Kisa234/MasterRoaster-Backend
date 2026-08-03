import { Router } from "express";
import { PaqueteController } from "./controller";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";
import { PaqueteDataSourceImpl } from "../../infrastructure/datasources/paquete.datasource.impl";
import { PaqueteItemDataSourceImpl } from "../../infrastructure/datasources/paquete-item.datasource.impl";
import { InventarioGenericoDataSourceImpl } from "../../infrastructure/datasources/inventario-generico.datasource.impl";
import { PaqueteRepositoryImpl } from "../../infrastructure/repositories/paquete.repository.impl";
import { PaqueteItemRepositoryImpl } from "../../infrastructure/repositories/paquete-item.repository.impl";
import { InventarioGenericoRepositoryImpl } from "../../infrastructure/repositories/inventario-generico.repository.impl";

export class PaqueteRoutes {
    static get routes(): Router {
        const router = Router();

        const paqueteRepo = new PaqueteRepositoryImpl(new PaqueteDataSourceImpl());
        const paqueteItemRepo = new PaqueteItemRepositoryImpl(new PaqueteItemDataSourceImpl());
        const inventarioRepo = new InventarioGenericoRepositoryImpl(new InventarioGenericoDataSourceImpl());

        const controller = new PaqueteController(paqueteRepo, paqueteItemRepo, inventarioRepo);

        router.post('/', authMiddleware, controller.create);
        router.post('/:id/items', authMiddleware, controller.addItem);
        router.delete('/:id/items/:id_item', authMiddleware, controller.deleteItem);
        router.put('/:id/listo', authMiddleware, controller.marcarListo);
        router.put('/:id/cancelar', authMiddleware, controller.cancelar);

        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);

        return router;
    }
}
