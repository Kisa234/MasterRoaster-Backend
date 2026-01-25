import { Router } from "express";
import { InventarioLoteTostadoController } from "./controller";

import { InventarioLoteTostadoDataSourceImpl } from "../../../infrastructure/datasources/inventario-lote-tostado.datasource.impl";
import { InventarioLoteTostadoRepositoryImpl } from "../../../infrastructure/repositories/inventario-lote-tostado.repository.impl";

export class InventarioLoteTostadoRoutes {

  static get routes(): Router {
    const router = Router();

    // Infra
    const inventarioDatasource = new InventarioLoteTostadoDataSourceImpl();
    const inventarioRepository =
      new InventarioLoteTostadoRepositoryImpl(inventarioDatasource);

    // Controller
    const controller = new InventarioLoteTostadoController(inventarioRepository);

    // Routes
    router.post("/", controller.createInventario);

    router.get("/almacen/:id_almacen", controller.getByAlmacen);
    router.get(
      "/lote-tostado/:id_lote_tostado/almacen/:id_almacen",
      controller.getByLoteTostadoAndAlmacen
    );

    router.put("/:id_inventario", controller.updateInventario);

    return router;
  }
}
