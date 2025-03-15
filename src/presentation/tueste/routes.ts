import { Router } from "express";
import { TuesteDataSourceImpl } from "../../infrastructure/datasources/tueste.datasource.impl";
import { TuesteRepositoryImpl } from "../../infrastructure/repositories/tueste.repository.impl";
import { TuesteController } from "./controller";

export class TuesteRoutes {


    static get routes():Router {

        const router = Router();

        const datasource = new TuesteDataSourceImpl();
        const tuesteRepository = new TuesteRepositoryImpl(datasource);
        const tuesteController = new TuesteController(tuesteRepository);
        
        router.post('/', tuesteController.createTueste);
        router.get('/:id', tuesteController.getTuesteById);
        router.put('/:id', tuesteController.updateTueste);
        router.delete('/:id', tuesteController.deleteTueste);
        router.get('/fecha/:fecha', tuesteController.getTuesteByFecha);

        return router;

    }
}