import { Router } from "express";
import { AnalisisDataSourceImpl } from "../../infrastructure/datasources/analisis.datasource.impl";
import { AnalisisRepositoryImpl } from "../../infrastructure/repositories/analisis.repository.impl";
import { AnalisisController } from "./controller";

export class AnalisisRoutes{

    static get routes():Router{
        const router = Router();

        const datasource = new AnalisisDataSourceImpl();
        const analisisRepository = new AnalisisRepositoryImpl(datasource);
        const analisisController = new AnalisisController(analisisRepository);

        router.post('/',analisisController.createAnalisis);
        router.put('/:id',analisisController.updateAnalisis);
        router.get('/:id',analisisController.getAnalisisById);
        router.get('/lote/:id_lote',analisisController.getAnalisisByLoteId);
        router.get('/muestra/:id_muestra',analisisController.getAnalisisByMuestraId);
        router.get('/',analisisController.getAllAnalisis);
        router.delete('/:id',analisisController.deleteAnalisis);
       
        return router;
    }


}