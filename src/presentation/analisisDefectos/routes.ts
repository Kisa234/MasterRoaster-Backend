import { AnalisisDefectosDataSourceImpl } from './../../infrastructure/datasources/analisisDefectos.datasource.impl';
import { AnalisisDefectosRespositoryImpl } from './../../infrastructure/repositories/analisisDefectos.repository.impl';
import { Router } from "express";
import { LoteDataSourceImpl } from "../../infrastructure/datasources/lote.datasource.impl";
import { LoteRepositoryImpl } from "../../infrastructure/repositories/lote.repository.impl";
import { AnalisisDataSourceImpl } from "../../infrastructure/datasources/analisis.datasource.impl";
import { AnalisisRepositoryImpl } from "../../infrastructure/repositories/analisis.repository.impl";
import { LoteAnalisisDataSourceImpl } from "../../infrastructure/datasources/lote-analisis.datasource.impl";
import { LoteAnalisisRepositoryImpl } from "../../infrastructure/repositories/lote-analisis.repository.impl";
import { MuestraDataSourceImpl } from "../../infrastructure/datasources/muestra.datasource.impl";
import { MuestraRepositoryImpl } from "../../infrastructure/repositories/muestra.repository.impl";
import { MuestraAnalisisDatasourceImpl } from "../../infrastructure/datasources/muestra-analisis.datasource.impl";
import { MuestraAnalisisRespositoryImpl } from "../../infrastructure/repositories/muestra-analisis.repository.impl";
import { AnalisisDefectosController } from './controller';

export class AnalisisDefectosRoutes {
    static get routes(): Router {
        const router = Router();

        const AnalisisDefectosDatasource = new AnalisisDefectosDataSourceImpl();
        const AnalisisDefectosRepository = new AnalisisDefectosRespositoryImpl(AnalisisDefectosDatasource);

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

        const analisisDefectosController = new AnalisisDefectosController(
            AnalisisDefectosRepository,
            LoteRepository,
            MuestraRepository,
            AnalisisRepository,
            LoteAnalisisRepository,
            MuestraAnalisisRepository
        )

        router.post('/:id/:type', analisisDefectosController.createAnalisisDefectos);
        router.get('/:id', analisisDefectosController.getAnalisisDefectosById);
        router.put('/:id/:type', analisisDefectosController.updateAnalisisDefectos);
        router.delete('/:id', analisisDefectosController.deleteAnalisisDefectos);
        
        return router;
    }
}