import { Router } from "express";
import { RolController } from "./controller";
import { RolDataSourceImpl } from "../../../infrastructure/datasources/rol.datasource";
import { RolRepositoryImpl } from "../../../infrastructure/repositories/rol.repository";

export class RolRoutes {
    static get routes() {
        const router = Router();

        const datasource = new RolDataSourceImpl();
        const repository = new RolRepositoryImpl(datasource);
        const controller = new RolController(repository);

        router.post("/", controller.createRol);
        router.get("/", controller.getAllRoles);
        router.put("/:id", controller.updateRol);

        return router;
    }
}
