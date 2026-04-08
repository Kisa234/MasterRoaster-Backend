import { Router } from "express";
import { InsumoController } from "./controller";

import { InsumoDataSourceImpl } from "../../infrastructure/datasources/insumo.datasource.impl";
import { InsumoRepositoryImpl } from "../../infrastructure/repositories/insumo.repository.impl";

export class InsumoRoutes {

  static get routes(): Router {
    const router = Router();

    // Infra
    const insumoDatasource = new InsumoDataSourceImpl();
    const insumoRepository = new InsumoRepositoryImpl(insumoDatasource);

    // Controller
    const controller = new InsumoController(insumoRepository);

    // ---- Query routes (específicas primero) ----
    router.get("/activos", controller.getInsumosActivos);
    router.get('/con-inventarios', controller.getInsumosConInventarios);
    router.get('/con-inventarios/:id_insumo', controller.getInsumoConInventariosById);

    // ---- CRUD ----
    router.post("/", controller.createInsumo);
    router.get("/", controller.getAllInsumos);
    router.get("/:id_insumo", controller.getInsumoById);
    router.patch("/:id_insumo", controller.updateInsumo);
    router.delete("/:id_insumo", controller.deleteInsumo);
    return router;
  }
}
