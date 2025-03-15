import { Router } from "express";
import { AnalisisFisicoDataSourceImpl } from "../../infrastructure/datasources/analisisFisico.datasource.impl";
import { AnalisisFisicoRepositoryImpl } from "../../infrastructure/repositories/analisisFisico.repository.impl";
import { AnalisisFisicoController } from "./controller";


export class AnalisisFisicoRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new AnalisisFisicoDataSourceImpl();
        const analisisFisicoRepository = new AnalisisFisicoRepositoryImpl(datasource);
        const analisisFisicoController = new AnalisisFisicoController(analisisFisicoRepository);

        router.post('/', analisisFisicoController.createAnalisisFisico);
        router.get('/:id', analisisFisicoController.getAnalisisFisicoById);
        router.put('/:id', analisisFisicoController.updateAnalisisFisico);

        return router;
    }

}