import { Router } from "express";
import { IngresoProductoController } from "./controller";
import { IngresoProductoDataSourceImpl } from "../../infrastructure/datasources/ingreso-producto.datasource.impl";
import { IngresoProductoRepositoryImpl } from "../../infrastructure/repositories/ingreso-producto.repository.impl";


export class IngresoProductoRoutes {

  static get routes(): Router {
    const router = Router();

    // Infra
    const datasource = new IngresoProductoDataSourceImpl();
    const repository = new IngresoProductoRepositoryImpl(datasource);

    // Controller
    const controller = new IngresoProductoController(repository);

    // Routes
    router.post("/", controller.createIngreso);

    router.get("/almacen/:id_almacen", controller.getByAlmacen);
    router.get("/producto/:id_producto", controller.getByProducto);

    router.put("/:id_ingreso", controller.updateIngreso);

    return router;
  }
}
