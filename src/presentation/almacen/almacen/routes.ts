import { Router } from "express";

import { AlmacenRepositoryImpl } from "../../../infrastructure/repositories/almacen.repository.impl";

export class AlmacenRoutes {

  static get routes(): Router {
    const router = Router();

    // Infra
    const almacenDatasource = new AlmacenDataSourceImpl();
    const almacenRepository = new AlmacenRepositoryImpl(almacenDatasource);

    // Controller
    const controller = new AlmacenController(almacenRepository);

    // ---- CRUD ----
    router.post("/", controller.createAlmacen);
    router.get("/", controller.getAllAlmacenes);
    router.get("/:id_almacen", controller.getAlmacenById);
    router.put("/:id_almacen", controller.updateAlmacen);
    router.delete("/:id_almacen", controller.deleteAlmacen);

    return router;
  }
}
