import { Router } from "express";
import { MuestraAnalisisController } from "./controller";
import { MuestraAnalisisDatasourceImpl } from "../../infrastructure/datasources/muestra-analisis.datasource.impl";
import { MuestraAnalisisRespositoryImpl } from "../../infrastructure/repositories/muestra-analisis.repository.impl";

export class MuestraAnalisisRoutes {
    static get routes() {
        const router = Router();

        const datasource = new MuestraAnalisisDatasourceImpl();
        const muestraAnalisisRepository = new MuestraAnalisisRespositoryImpl(datasource);
        const muestraAnalisisController = new MuestraAnalisisController(muestraAnalisisRepository);

        router.post('/', muestraAnalisisController.createMuestraAnalisis);
        router.get('/muestra/:id_muestra', muestraAnalisisController.getMuestraAnalisisByMuestra);
        router.get('/analisis/:id_analisis', muestraAnalisisController.getMuestraAnalisisByAnalisis);

        return router;
    }
}