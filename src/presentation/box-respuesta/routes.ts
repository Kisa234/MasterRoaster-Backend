import { Router } from "express";

import { BoxRespuestaController } from "./controller";
import { BoxRespuestaDataSourceImpl } from "../../infrastructure/datasources/boxrespuesta.datasource.impl";
import { BoxRespuestaRepositoryImpl } from "../../infrastructure/repositories/boxrespuesta.repository.impl";

export class BoxRespuestaRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new BoxRespuestaDataSourceImpl();
    const repository = new BoxRespuestaRepositoryImpl(datasource);

    const controller = new BoxRespuestaController(repository);

    router.post("/", controller.create);
    router.get("/template/:id_box_template", controller.getByTemplate);
    router.get("/user/:id_user", controller.getByUser);
    router.get("/:id_respuesta", controller.getById);
    router.put("/:id_respuesta", controller.update);
    router.delete("/:id_respuesta", controller.delete);

    return router;
  }
}
