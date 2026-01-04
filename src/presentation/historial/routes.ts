import { Router } from "express";
import { HistorialDataSourceImpl } from "../../infrastructure/datasources/historial.datasource.impl";
import { HistorialRepositoryImpl } from "../../infrastructure/repositories/historial.repository.impl";
import { HistorialController } from "./controller";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";

export class HistorialRoutes {
    static get routes() {
        const router = Router();

        const datasource = new HistorialDataSourceImpl();
        const historialRepository = new HistorialRepositoryImpl(datasource);
        const historialController = new HistorialController(historialRepository);

        router.post('/', authMiddleware, historialController.createHistorial);
        router.get('/', historialController.getAllHistorial);
        router.get('/user/:id', historialController.getHistorialByUserId);
        router.get('/entidad/:id', historialController.getHistorialByEntidadId);
        router.get('/:id', historialController.getHistorialById);

        return router;
    }
}