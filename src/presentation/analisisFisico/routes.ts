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
import { MuestraRepositoryImpl } from '../../infrastructure/repositories/muestra.repository.impl';
import { MuestraDataSourceImpl } from '../../infrastructure/datasources/muestra.datasource.impl';
import { MuestraAnalisisRespositoryImpl } from '../../infrastructure/repositories/muestra-analisis.repository.impl';
import { MuestraAnalisisDatasourceImpl } from '../../infrastructure/datasources/muestra-analisis.datasource.impl';


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

        const MuestraDataSource = new MuestraDataSourceImpl();  
        const MuestraRepository = new MuestraRepositoryImpl(MuestraDataSource);

        const MuestraAnalisisDataSource = new MuestraAnalisisDatasourceImpl();
        const MuestraAnalisisRepository = new MuestraAnalisisRespositoryImpl(MuestraAnalisisDataSource);

        const analisisFisicoController = new AnalisisFisicoController(
            AnalisisFisicoRepository,
            LoteRepository,
            AnalisisRepository,
            LoteAnalisisRepository,
            MuestraRepository,
            MuestraAnalisisRepository
        );

        router.post('/:id/:type', analisisFisicoController.createAnalisisFisico);
        router.get('/:id', analisisFisicoController.getAnalisisFisicoById);
        router.put('/:id/:type', analisisFisicoController.updateAnalisisFisico);
        router.get('/', analisisFisicoController.getAllAnalisisFisico);
        router.delete('/:id', analisisFisicoController.deleteAnalisisFisico);

        return router;
    }

}