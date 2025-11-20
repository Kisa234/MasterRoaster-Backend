import { Router } from "express";

import { BoxOpcionController } from "./controller";
import { BoxOpcionDataSourceImpl } from "../../infrastructure/datasources/boxopcion.datasource.impl";
import { BoxOpcionRepositoryImpl } from "../../infrastructure/repositories/boxopcion.repository.impl";

export class BoxOpcionRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new BoxOpcionDataSourceImpl();
    const repository = new BoxOpcionRepositoryImpl(datasource);

    const controller = new BoxOpcionController(repository);

    router.post("/", controller.create);
    router.get("/template/:id_box_template", controller.getByTemplate);
    router.get("/:id_opcion", controller.getById);
    router.put("/:id_opcion", controller.update);
    router.delete("/:id_opcion", controller.delete);

    return router;
  }
}
