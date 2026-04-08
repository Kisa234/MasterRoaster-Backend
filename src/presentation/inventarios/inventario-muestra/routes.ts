import { Router } from "express";
import { InventarioMuestraController } from "./controller";

import { InventarioMuestraDataSourceImpl } from "../../../infrastructure/datasources/inventario-muestra.datasource.impl";
import { InventarioMuestraRepositoryImpl } from "../../../infrastructure/repositories/inventario-muestra.repository.impl";

export class InventarioMuestraRoutes {

  static get routes(): Router {
    const router = Router();

    // Infra
    const inventarioDatasource = new InventarioMuestraDataSourceImpl();
    const inventarioRepository =
      new InventarioMuestraRepositoryImpl(inventarioDatasource);

    // Controller
    const controller = new InventarioMuestraController(inventarioRepository);

    // Routes
    router.post("/", controller.createInventario);
    router.get("/almacen/:id_almacen", controller.getByAlmacen);
    router.get("/muestra/:id_muestra/almacen/:id_almacen",controller.getByMuestraAndAlmacen);
    router.put("/:id_inventario", controller.updateInventario);

    return router;
  }
}
