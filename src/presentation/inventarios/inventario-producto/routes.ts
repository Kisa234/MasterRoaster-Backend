import { Router } from "express";
import { InventarioProductoController } from "./controller";
import { InventarioProductoDataSourceImpl } from "../../../infrastructure/datasources/inventario-producto.datasource.impl";
import { InventarioProductoRepositoryImpl } from "../../../infrastructure/repositories/inventario-producto.repository.impl";

export class InventarioProductosRoutes {
  static get routes() {
    const router = Router();

    const datasource = new InventarioProductoDataSourceImpl();
    const repository = new InventarioProductoRepositoryImpl(datasource);
    const controller = new InventarioProductoController(repository);

    router.get( "/producto/:id_producto/almacen/:id_almacen", controller.getByProductoAndAlmacen);

    router.post("/", controller.createInventario);
    router.get("/", controller.getAllInventarios);
    router.get("/:id", controller.getInventarioById);
    router.put("/:id", controller.updateInventario);
    router.delete("/:id", controller.deleteInventario);

    return router;
  }
}
