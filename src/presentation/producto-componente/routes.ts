import { Router } from "express";
import { ProductoComponenteController } from "./controller";
import { ProductoComponenteDataSourceImpl } from "../../infrastructure/datasources/producto-componente.datasource.impl";
import { ProductoComponenteRepositoryImpl } from "../../infrastructure/repositories/producto-componente.repository.impl";

export class ProductoComponenteRoutes {
  static get routes() {
    const router = Router();

    const datasource = new ProductoComponenteDataSourceImpl();
    const repository = new ProductoComponenteRepositoryImpl(datasource);
    const controller = new ProductoComponenteController(repository);

    router.post("/", controller.createComponente);
    router.put("/:id_combo/:id_producto", controller.updateComponente);
    router.delete("/:id_combo/:id_producto", controller.deleteComponente);

    return router;
  }
}
