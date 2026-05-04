import { Router } from "express";

import { BalonGasDatasourceImpl } from "../../infrastructure/datasources/balon-gas.datasource.impl";
import { BalonGasRepositoryImpl } from "../../infrastructure/repositories/balon-gas.repository.impl";
import { BalonGasController } from "./controller";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";


export class BalonGasRoutes {

  static get routes(): Router {

    const router = Router();

    // datasource + repository
    const datasource = new BalonGasDatasourceImpl();
    const repository = new BalonGasRepositoryImpl(datasource);

    // controller (solo recibe repo)
    const controller = new BalonGasController(repository);

    // rutas
    router.post('/', authMiddleware, controller.createBalonGas);
    router.post('/start', authMiddleware, controller.startBalonGas);
    router.post('/finalize', authMiddleware, controller.finalizeBalonGas);

    router.get('/', authMiddleware, controller.getBalonesGas);
    router.get('/actual', authMiddleware, controller.getBalonGasActual);
    router.get('/:id_balon_gas', authMiddleware, controller.getBalonGasById);

    return router;
  }
}