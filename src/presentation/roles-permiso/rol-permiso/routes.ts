import { Router } from "express";
import { RolPermisoController } from "./controller";
import { RolPermisoDataSourceImpl } from "../../../infrastructure/datasources/permiso-rol.datasource";
import { RolPermisoRepositoryImpl } from "../../../infrastructure/repositories/permiso-rol.repository";
import { RolRepositoryImpl } from "../../../infrastructure/repositories/rol.repository";
import { PermisoRepositoryImpl } from "../../../infrastructure/repositories/permiso.repository.impl";
import { PermisoDataSourceImpl } from "../../../infrastructure/datasources/permiso.datasource.impl";
import { RolDataSourceImpl } from "../../../infrastructure/datasources/rol.datasource";

export class RolPermisoRoutes {
    static get routes() {
        const router = Router();

        const rolPermisoDatasource = new RolPermisoDataSourceImpl();
        const rolPermisoRepository = new RolPermisoRepositoryImpl(rolPermisoDatasource);

        const rolDatasource = new RolDataSourceImpl();
        const rolRepository = new RolRepositoryImpl(rolDatasource);

        const permisoDatasource = new PermisoDataSourceImpl();
        const permisoRepository = new PermisoRepositoryImpl(permisoDatasource);

        const controller = new RolPermisoController(
            rolPermisoRepository,
            rolRepository,
            permisoRepository
        );

        router.post("/", controller.assignPermiso);
        router.get("/:id_rol", controller.getPermisosByRol);
        router.delete("/:id_rol/:id_permiso", controller.removePermiso);

        return router;
    }
}
