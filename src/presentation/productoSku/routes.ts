import { Router } from "express";
import { ProductoSkuDataSourceImpl } from "../../infrastructure/datasources/productoSku.datasource.impl";
import { ProductoSkuRepositoryImpl } from "../../infrastructure/repositories/productoSku.repository.impl";
import { ProductoSkuController } from "./controller";

export class ProductoSkuRoutes {
  static get routes() {
    const router = Router();

    const skuDatasource = new ProductoSkuDataSourceImpl();
    const skuRepository = new ProductoSkuRepositoryImpl(skuDatasource);

    const controller = new ProductoSkuController(skuRepository);

    // CREATE (empaquetar)
    router.post("/", controller.create);

    // READ
    router.get("/", controller.list);
    router.get("/producto/:id_producto", controller.listByProducto);
    router.get("/lote-tostado/:id_lote_tostado", controller.listByLoteTostado);
    router.get("/:id", controller.getById);

    // UPDATE
    router.patch("/:id", controller.update);

    // DELETE
    router.delete("/:id", controller.delete);

    return router;
  }
}
