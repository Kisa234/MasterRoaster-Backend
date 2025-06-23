import { LoteAnalisisDataSourceImpl } from './../../infrastructure/datasources/lote-analisis.datasource.impl';
import { LoteAnalisisRepositoryImpl } from './../../infrastructure/repositories/lote-analisis.repository.impl';
import { CreateLote, CreateLoteUseCase } from './../../domain/usecases/lote/lote/create-lote';
import { Router } from "express";
import { LoteDataSourceImpl } from "../../infrastructure/datasources/lote.datasource.impl";
import { LoteRepositoryImpl } from "../../infrastructure/repositories/lote.repository.impl";
import { LoteController } from "./controller";
import { MuestraRepositoryImpl } from "../../infrastructure/repositories/muestra.repository.impl";
import { MuestraDataSourceImpl } from "../../infrastructure/datasources/muestra.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { UserDataSourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { AnalisisRepositoryImpl } from '../../infrastructure/repositories/analisis.repository.impl';
import { AnalisisDataSourceImpl } from '../../infrastructure/datasources/analisis.datasource.impl';
import { AnalisisFisicoRepositoryImpl } from '../../infrastructure/repositories/analisisFisico.repository.impl';
import { AnalisisFisicoDataSourceImpl } from '../../infrastructure/datasources/analisisFisico.datasource.impl';
import { AnalisisSensorialDataSourceImpl } from '../../infrastructure/datasources/analisisSensorial.datasource.impl';
import { AnalisisSensorialRepositoryImpl } from '../../infrastructure/repositories/analisisSensorial.repository.impl';
import { authMiddleware } from '../../infrastructure/middlewares/auth.middleware';

export class LoteRoutes{

    static get routes():Router{
        const router = Router();

        
        const LoteAnalisisDataSource = new LoteAnalisisDataSourceImpl();
        const loteAnalisisRepository = new LoteAnalisisRepositoryImpl(LoteAnalisisDataSource);
        
        const muestraDatasource = new MuestraDataSourceImpl();
        const muestraRepository = new MuestraRepositoryImpl(muestraDatasource);
        
        const analisisDatasource = new AnalisisDataSourceImpl();
        const analisisRepository = new AnalisisRepositoryImpl(analisisDatasource);
        
        const analisisFisicoDataSource = new AnalisisFisicoDataSourceImpl();
        const analisisFisicoRepository = new AnalisisFisicoRepositoryImpl(analisisFisicoDataSource);
        
        
        const analisisSensorialDataSource = new AnalisisSensorialDataSourceImpl();
        const analisisSensorialRepository = new AnalisisSensorialRepositoryImpl(analisisSensorialDataSource);
        
        
        const loteDatasource = new LoteDataSourceImpl();
        const loteRepository = new LoteRepositoryImpl(loteDatasource);
        
        const userDatasource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(userDatasource);
        
        // Use cases
        const createLoteUseCase = new CreateLote(loteRepository, userRepository);




        const loteController = new LoteController(
            createLoteUseCase,
            loteAnalisisRepository,
            muestraRepository,
            analisisRepository,
            analisisFisicoRepository,
            analisisSensorialRepository,
            loteRepository,
            userRepository
        );

        router.post('/', loteController.createLote);
        router.post('/muestra/:id',authMiddleware ,loteController.createLoteFromMuestra);
        router.get('/', loteController.getLotes);
        router.get('/tostados', loteController.getAllTostados);
        router.get('/verdes', loteController.getAllVerdes);
        router.get('/:id', loteController.getLoteById);
        router.put('/:id', loteController.updateLote);
        router.delete('/:id', loteController.deleteLote);
        router.get('/user/:id', loteController.getLotesByUserId);
        router.get('/byLote/:id',loteController.getUserByLote);

        return router;
    }


}