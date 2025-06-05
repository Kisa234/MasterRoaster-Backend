import { Router } from "express";
import { AnalisisSensorialDataSourceImpl } from "../../infrastructure/datasources/analisisSensorial.datasource.impl";
import { AnalisisSensorialRepositoryImpl } from "../../infrastructure/repositories/analisisSensorial.repository.impl";
import { AnalisisSensorialController } from "./controller";

export class AnalisisSensorialRoutes {

    static get routes():Router {
        const router = Router();

        const datasource = new AnalisisSensorialDataSourceImpl();
        const analisisSensorialRepository = new AnalisisSensorialRepositoryImpl(datasource);
        const analisisSensorialController = new AnalisisSensorialController(analisisSensorialRepository);

        router.post('/:id', analisisSensorialController.createAnalisisSensorial);
        router.get('/:id', analisisSensorialController.getAnalisisSensorialById);
        router.put('/:id', analisisSensorialController.updateAnalisisSensorial);
        router.get('/', analisisSensorialController.getAllAnalisisSensorial);
        router.delete('/:id', analisisSensorialController.deleteAnalisisSensorial);


        return router;
    }

}