import { Router } from "express";
import { InventarioLoteController } from "./controller";

import { InventarioLoteDataSourceImpl } from "../../../infrastructure/datasources/inventario-lote.datasource.impl";
import { InventarioLoteRepositoryImpl } from "../../../infrastructure/repositories/inventario-lote.repository.impl";

export class InventarioLoteRoutes {

  static get routes(): Router {
    const router = Router();

    // Infra
    const inventarioDatasource = new InventarioLoteDataSourceImpl();
    const inventarioRepository = new InventarioLoteRepositoryImpl(inventarioDatasource);

    // Controller
    const controller = new InventarioLoteController(inventarioRepository);

    // ---- Routes ----
    router.post("/", controller.createInventario);
    router.get("/almacen/:id_almacen", controller.getByAlmacen);
    router.get("/lote/:id_lote/almacen/:id_almacen", controller.getByLoteAndAlmacen);
    router.put("/:id_inventario", controller.updateInventario);

    return router;
  }
}
