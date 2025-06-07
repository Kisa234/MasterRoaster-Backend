import { Router } from "express";
import { AnalisisSensorialDataSourceImpl } from "../../infrastructure/datasources/analisisSensorial.datasource.impl";
import { AnalisisSensorialRepositoryImpl } from "../../infrastructure/repositories/analisisSensorial.repository.impl";
import { AnalisisSensorialController } from "./controller";
import { LoteDataSourceImpl } from "../../infrastructure/datasources/lote.datasource.impl";
import { LoteRepositoryImpl } from "../../infrastructure/repositories/lote.repository.impl";
import { AnalisisDataSourceImpl } from "../../infrastructure/datasources/analisis.datasource.impl";
import { AnalisisRepositoryImpl } from "../../infrastructure/repositories/analisis.repository.impl";
import { LoteAnalisisDataSourceImpl } from "../../infrastructure/datasources/lote-analisis.datasource.impl";
import { LoteAnalisisRepositoryImpl } from "../../infrastructure/repositories/lote-analisis.repository.impl";

export class AnalisisSensorialRoutes {

    static get routes():Router {
        const router = Router();

        const AnalisisSensorialdatasource = new AnalisisSensorialDataSourceImpl();
        const AnalisisSensorialRepository = new AnalisisSensorialRepositoryImpl(AnalisisSensorialdatasource);

        const LoteDataSource = new LoteDataSourceImpl();
        const LoteRepository = new LoteRepositoryImpl(LoteDataSource);

        const AnalisisDataSource = new AnalisisDataSourceImpl();
        const AnalisisRepository = new AnalisisRepositoryImpl(AnalisisDataSource);

        const LoteAnalisisDataSource = new LoteAnalisisDataSourceImpl();
        const LoteAnalisisRepository = new LoteAnalisisRepositoryImpl(LoteAnalisisDataSource);



        const analisisSensorialController = new AnalisisSensorialController(
            AnalisisSensorialRepository,
            LoteRepository,
            AnalisisRepository,
            LoteAnalisisRepository  
        );

        router.post('/:id', analisisSensorialController.createAnalisisSensorial);
        router.get('/:id', analisisSensorialController.getAnalisisSensorialById);
        router.put('/:id', analisisSensorialController.updateAnalisisSensorial);
        router.get('/', analisisSensorialController.getAllAnalisisSensorial);
        router.delete('/:id', analisisSensorialController.deleteAnalisisSensorial);


        return router;
    }

}