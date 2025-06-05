import { Router } from "express";
import { LoteAnalisisRepositoryImpl } from "../../infrastructure/repositories/lote-analisis.repository.impl";
import { LoteAnalisisDataSourceImpl } from "../../infrastructure/datasources/lote-analisis.datasource.impl";
import { LoteAnalisisController } from "./controller";


export class LoteAnalisisRoutes {
    static get routes() {
        const router = Router();

        const datasource = new LoteAnalisisDataSourceImpl();
        const loteAnalisisRepository = new LoteAnalisisRepositoryImpl(datasource);
        const loteAnalisisController = new LoteAnalisisController(loteAnalisisRepository);

        router.post('/', loteAnalisisController.createLoteAnalisis);
        router.get('/lote/:id_lote', loteAnalisisController.getLoteAnalisisByLote);
        router.get('/analisis/:id_analisis', loteAnalisisController.getLoteAnalisisByAnalisis);

        return router;
    }
}