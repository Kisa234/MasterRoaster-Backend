import { Router } from "express";
import { CambioController } from "./controller";
import { CambioDataSourceImpl } from "../../infrastructure/datasources/cambio.datasource.impl";
import { CambioRepositoryImpl } from "../../infrastructure/repositories/cambio.repository.impl";

export class CambioRoutes {

    static get routes() {
        const router = Router();

        const datasource = new CambioDataSourceImpl();
        const repository = new CambioRepositoryImpl(datasource);
        const controller = new CambioController(repository);

        router.post("/", controller.createCambio);

        // Historial por entidad (ej: lote, pedido, ingreso-cafe)
        router.get("/entidad/:entidad/:id_entidad", controller.getCambiosByEntidad);

        // Historial por usuario
        router.get("/user/:id_user", controller.getCambiosByUser);

        return router;
    }
}
