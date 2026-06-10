import { Router } from "express";

import { BalonGasDatasourceImpl } from "../../infrastructure/datasources/balon-gas.datasource.impl";
import { BalonGasRepositoryImpl } from "../../infrastructure/repositories/balon-gas.repository.impl";
import { BalonGasController } from "./controller";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";

export class BalonGasRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new BalonGasDatasourceImpl();
    const repository = new BalonGasRepositoryImpl(datasource);
    const controller = new BalonGasController(repository);

    router.post('/',           authMiddleware, controller.createBalonGas);
    router.post('/historico',  authMiddleware, controller.createBalonGasHistorico);
    router.post('/start',      authMiddleware, controller.startBalonGas);
    router.post('/finalize',   authMiddleware, controller.finalizeBalonGas);

    router.get('/estadisticas', authMiddleware, controller.getEstadisticasBalonGas);
    router.get('/',             authMiddleware, controller.getBalonesGas);
    router.get('/actual',       authMiddleware, controller.getBalonGasActual);
    router.get('/:id_balon_gas', authMiddleware, controller.getBalonGasById);

    return router;
  }
}