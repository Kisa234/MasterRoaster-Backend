import { Router } from "express";
import { LoteDataSourceImpl } from "../../infrastructure/datasources/lote.datasource.impl";
import { LoteRepositoryImpl } from "../../infrastructure/repositories/lote.repository.impl";
import { LoteController } from "./controller";

export class LoteRoutes{

    static get routes():Router{
        const router = Router();

        const datasource = new LoteDataSourceImpl();
        const loteRepository = new LoteRepositoryImpl(datasource);
        const loteController = new LoteController(loteRepository);

        router.post('/', loteController.createLote);
        router.get('/', loteController.getLotes);
        
        router.get('/:id', loteController.getLoteById);
        router.put('/:id', loteController.updateLote);
        router.delete('/:id', loteController.deleteLote);



        return router;
    }


}