import { Router } from "express";
import { TransportistaController } from "./controller";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";
import { TransportistaDataSourceImpl } from "../../infrastructure/datasources/transportista.datasource.impl";
import { TransportistaRepositoryImpl } from "../../infrastructure/repositories/transportista.repository.impl";

export class TransportistaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new TransportistaDataSourceImpl();
        const repository = new TransportistaRepositoryImpl(datasource);
        const controller = new TransportistaController(repository);

        router.post('/', authMiddleware, controller.create);
        router.put('/:id', authMiddleware, controller.update);
        router.delete('/:id', authMiddleware, controller.delete);

        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);

        return router;
    }
}
