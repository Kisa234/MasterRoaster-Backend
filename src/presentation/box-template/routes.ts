import { Router } from "express";

import { BoxTemplateController } from "./controller";
import { BoxTemplateDataSourceImpl } from "../../infrastructure/datasources/boxtemplate.datasource.impl";
import { BoxTemplateRepositoryImpl } from "../../infrastructure/repositories/boxtemplate.repository.impl";
import { BoxOpcionDataSourceImpl } from "../../infrastructure/datasources/boxopcion.datasource.impl";
import { BoxOpcionRepositoryImpl } from "../../infrastructure/repositories/boxopcion.repository.impl";

export class BoxTemplateRoutes {

  static get routes(): Router {
    const router = Router();

    const boxTemplateDatasource = new BoxTemplateDataSourceImpl();
    const boxTemplateRepository = new BoxTemplateRepositoryImpl(boxTemplateDatasource);

    const boxOpcionDatasource = new BoxOpcionDataSourceImpl(); 
    const boxOpcionRepository = new BoxOpcionRepositoryImpl(boxOpcionDatasource);

    const controller = new BoxTemplateController(boxTemplateRepository, boxOpcionRepository);

    router.post("/", controller.create);
    router.get("/", controller.getAll);
    router.get("/active", controller.getActiveTemplate);
    router.get("/:id_box_template", controller.getById);
    router.put("/:id_box_template", controller.update);
    router.delete("/:id_box_template", controller.delete);
    router.post("/set-active/:id_box_template", controller.setActiveTemplate);

    return router;
  }
}
