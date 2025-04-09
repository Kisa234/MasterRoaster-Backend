import { Router } from "express";
import { AnalisisRapidoDataSourceImpl } from "../../infrastructure/datasources/analisisRapido.datasource.impl";
import { AnalisisRapidoRepositoryImpl } from "../../infrastructure/repositories/analisisRapido.repository.impl";
import { AnalisisRapidoController } from "./controller";

export class AnalisisRapidoRoutes{

    static get routes():Router{
        const router = Router();

        const datasource = new AnalisisRapidoDataSourceImpl();
        const analisisRapidoRepository = new AnalisisRapidoRepositoryImpl(datasource);
        const analisisRapidoController = new AnalisisRapidoController(analisisRapidoRepository);

        router.post('/',analisisRapidoController.createAnalisisRapido);
        router.get('/:id',analisisRapidoController.getAnalisisRapidoById);
        router.put('/:id',analisisRapidoController.updateAnalisisRapido);
        router.get('/all',analisisRapidoController.getAllAnalisisRapido);
        router.delete('/:id',analisisRapidoController.deleteAnalisisRapido);
       
        return router;
    }

}