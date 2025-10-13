import { Router } from "express";
import { ProductoController } from "./controller";
import { ProductoDataSourceImpl } from "../../infrastructure/datasources/producto.datasource.impl";
import { ProductoRepositoryImpl } from "../../infrastructure/repositories/producto.repository.impl";

export class ProductoRoutes {
  static get routes() {
    const router = Router();

    const datasource = new ProductoDataSourceImpl();
    const repository = new ProductoRepositoryImpl(datasource);
    const controller = new ProductoController(repository);

    router.post("/", controller.createProducto);
    router.get("/", controller.getAllProductos);
    router.get("/:id", controller.getProductoById);
    router.put("/:id", controller.updateProducto);
    router.delete("/:id", controller.deleteProducto);

    return router;
  }
}
