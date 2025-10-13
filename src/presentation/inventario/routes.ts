import { Router } from "express";
import { InventarioController } from "./controller";
import { InventarioDataSourceImpl } from "../../infrastructure/datasources/inventario.datasource.impl";
import { InventarioRepositoryImpl } from "../../infrastructure/repositories/inventario.repository.impl";

export class InventarioRoutes {
  static get routes() {
    const router = Router();

    const datasource = new InventarioDataSourceImpl();
    const repository = new InventarioRepositoryImpl(datasource);
    const controller = new InventarioController(repository);

    router.post("/", controller.createInventario);
    router.get("/", controller.getAllInventarios);
    router.get("/:id", controller.getInventarioById);
    router.put("/:id", controller.updateInventario);
    router.delete("/:id", controller.deleteInventario);

    return router;
  }
}
