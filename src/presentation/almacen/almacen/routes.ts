import { Router } from "express";
import { AlmacenController } from "./controller";

import { AlmacenDataSourceImpl } from "../../../infrastructure/datasources/almacen.datasource.impl";
import { AlmacenRepositoryImpl } from "../../../infrastructure/repositories/almacen.repository.impl";

export class AlmacenRoutes {

  static get routes(): Router {
    const router = Router();

    // Repositories
    const almacenDatasource = new AlmacenDataSourceImpl();
    const almacenRepository = new AlmacenRepositoryImpl(almacenDatasource);

    // Controller
    const controller = new AlmacenController(almacenRepository);

    // ---- Query routes (específicas primero) ----
    router.get("/activos", controller.getAlmacenesActivos);

    // ---- CRUD ----
    router.post("/", controller.createAlmacen);
    router.get("/", controller.getAllAlmacenes);
    router.get("/:id_almacen", controller.getAlmacenById);
    router.patch("/:id_almacen", controller.updateAlmacen);
    router.delete("/:id_almacen", controller.deleteAlmacen);

    return router;
  }
}
