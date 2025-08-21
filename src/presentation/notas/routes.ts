import { Router } from "express";
import { NotasController } from "./controller";
import { NotasDataSourceImpl } from "../../infrastructure/datasources/notas.datasource.impl";
import { NotasRepositoryImpl } from "../../infrastructure/repositories/notas.repository.impl";

export class NotasRoutes {
  static get routes() {
    const router = Router();

    const datasource = new NotasDataSourceImpl();
    const notasRepository = new NotasRepositoryImpl(datasource);
    const notasController = new NotasController(notasRepository);

    router.post("/", notasController.createNotas);
    router.get("/", notasController.getAllNotas);
    router.get("/:id", notasController.getNotasById);
    router.put("/:id", notasController.updateNotas);
    router.delete("/:id", notasController.deleteNotas);

    return router;
  }
}
