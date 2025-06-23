import { Router } from "express";
import { AnalisisRapidoDataSourceImpl } from "../../infrastructure/datasources/analisisRapido.datasource.impl";
import { AnalisisRapidoRepositoryImpl } from "../../infrastructure/repositories/analisisRapido.repository.impl";
import { AnalisisRapidoController } from "./controller";
import { LoteTostadoDataSourceImpl } from "../../infrastructure/datasources/loteTostado.datasource.impl";
import { LoteTostadoRepositoryImpl } from "../../infrastructure/repositories/loteTostado.repository.impl";

export class AnalisisRapidoRoutes{

    static get routes():Router{
        const router = Router();

        const datasource = new AnalisisRapidoDataSourceImpl();
        const analisisRapidoRepository = new AnalisisRapidoRepositoryImpl(datasource);

        const loteTostadoDatasource = new LoteTostadoDataSourceImpl();
        const loteTostadoRepository = new LoteTostadoRepositoryImpl(loteTostadoDatasource);

        const analisisRapidoController = new AnalisisRapidoController(analisisRapidoRepository, loteTostadoRepository);

        router.post('/lote/:id',analisisRapidoController.createAnalisisRapido);
        router.get('/:id',analisisRapidoController.getAnalisisRapidoById);
        router.put('/:id',analisisRapidoController.updateAnalisisRapido);
        router.get('/',analisisRapidoController.getAllAnalisisRapido);
        router.delete('/:id',analisisRapidoController.deleteAnalisisRapido);
       
        return router;
    }

}