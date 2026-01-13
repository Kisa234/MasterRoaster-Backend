import { Router } from "express";
import { PermisoController } from "./controller";
import { PermisoDataSourceImpl } from "../../../infrastructure/datasources/permiso.datasource.impl";
import { PermisoRepositoryImpl } from "../../../infrastructure/repositories/permiso.repository.impl";

export class PermisoRoutes {
    static get routes() {
        const router = Router();

        const datasource = new PermisoDataSourceImpl();
        const repository = new PermisoRepositoryImpl(datasource);
        const controller = new PermisoController(repository);

        router.post("/", controller.createPermiso);
        router.get("/", controller.getAllPermisos);
        router.put("/:id", controller.updatePermiso);

        return router;
    }
}
