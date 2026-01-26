import { Router } from "express";
import { InventarioInsumoController } from "./controller";

import { InventarioInsumoDataSourceImpl } from "../../../infrastructure/datasources/inventario-insumo.datasource.impl";
import { InventarioInsumoRepositoryImpl } from "../../../infrastructure/repositories/inventario-insumo.repository.impl";

export class InventarioInsumoRoutes {

  static get routes(): Router {
    const router = Router();

    // Infra
    const datasource = new InventarioInsumoDataSourceImpl();
    const repository = new InventarioInsumoRepositoryImpl(datasource);

    // Controller
    const controller = new InventarioInsumoController(repository);

    // Routes
    router.post("/", controller.createInventario);

    router.get("/almacen/:id_almacen", controller.getByAlmacen);
    router.get(
      "/insumo/:id_insumo/almacen/:id_almacen",
      controller.getByInsumoAndAlmacen
    );

    router.put("/:id_inventario", controller.updateInventario);

    return router;
  }
}
