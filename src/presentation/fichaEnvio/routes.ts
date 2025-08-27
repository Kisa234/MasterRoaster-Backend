import { Router } from "express";
import { FichaEnvioDataSourceImpl } from "../../infrastructure/datasources/fichaEnvio.datasource.impl";
import { FichaEnvioRepositoryImpl } from "../../infrastructure/repositories/fichaEnvio.repository.impl";
import { FichaEnvioController } from "./controller";

export class FichaEnvioRoutes {
  static get routes() {
    const router = Router();

    // Infra
    const fichaDatasource = new FichaEnvioDataSourceImpl();
    const fichaRepository = new FichaEnvioRepositoryImpl(fichaDatasource);

    // Controller
    const controller = new FichaEnvioController(fichaRepository);

    // Rutas anidadas bajo /envio

    // CREATE
    router.post("/:id_envio", controller.create);

    // READ
    router.get("/:id_envio", controller.getByEnvio);

    // UPDATE
    router.patch("/:id_envio", controller.update);

    // DELETE
    router.delete("/:id_envio", controller.delete);

    return router;
  }
}
