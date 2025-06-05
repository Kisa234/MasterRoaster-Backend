import { AnalisisRepositoryImpl } from './../../infrastructure/repositories/analisis.repository.impl';
import { Router } from "express";
import { AnalisisFisicoDataSourceImpl } from "../../infrastructure/datasources/analisisFisico.datasource.impl";
import { AnalisisFisicoRepositoryImpl } from "../../infrastructure/repositories/analisisFisico.repository.impl";
import { AnalisisFisicoController } from "./controller";
import { LoteDataSourceImpl } from "../../infrastructure/datasources/lote.datasource.impl";
import { LoteRepositoryImpl } from "../../infrastructure/repositories/lote.repository.impl";
import { AnalisisDataSourceImpl } from '../../infrastructure/datasources/analisis.datasource.impl';
import { LoteAnalisisDataSourceImpl } from '../../infrastructure/datasources/lote-analisis.datasource.impl';
import { LoteAnalisisRepositoryImpl } from '../../infrastructure/repositories/lote-analisis.repository.impl';


export class AnalisisFisicoRoutes {

    static get routes(): Router {
        const router = Router();

        const AnalisisFisicoDatasource = new AnalisisFisicoDataSourceImpl();
        const AnalisisFisicoRepository = new AnalisisFisicoRepositoryImpl(AnalisisFisicoDatasource);

        const LoteDataSource = new LoteDataSourceImpl();
        const LoteRepository = new LoteRepositoryImpl(LoteDataSource);

        const AnalisisDataSource = new AnalisisDataSourceImpl();
        const AnalisisRepository = new AnalisisRepositoryImpl(AnalisisDataSource);

        const LoteAnalisisDataSource = new LoteAnalisisDataSourceImpl();
        const LoteAnalisisRepository = new LoteAnalisisRepositoryImpl(LoteAnalisisDataSource);




        const analisisFisicoController = new AnalisisFisicoController(
            AnalisisFisicoRepository,
            LoteRepository,
            AnalisisRepository,
            LoteAnalisisRepository
        );

        router.post('/:id', analisisFisicoController.createAnalisisFisico);
        router.get('/:id', analisisFisicoController.getAnalisisFisicoById);
        router.put('/:id', analisisFisicoController.updateAnalisisFisico);
        router.get('/', analisisFisicoController.getAllAnalisisFisico);
        router.delete('/:id', analisisFisicoController.deleteAnalisisFisico);

        return router;
    }

}