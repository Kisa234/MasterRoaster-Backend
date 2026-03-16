import { InventarioLoteRepositoryImpl } from './../../infrastructure/repositories/inventario-lote.repository.impl';
import { InventarioLoteDataSourceImpl } from './../../infrastructure/datasources/inventario-lote.datasource.impl';
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
import { PedidoDataSourceImpl } from '../../infrastructure/datasources/pedido.datasource.impl';
import { AnalisisDefectosDataSourceImpl } from '../../infrastructure/datasources/analisisDefectos.datasource.impl';
import { AnalisisDefectosRespositoryImpl } from '../../infrastructure/repositories/analisisDefectos.repository.impl';
import { auditMiddleware } from '../../infrastructure/middlewares/audit.middleware';
import PedidoRepositoryImpl from '../../infrastructure/repositories/pedido.repository.impl';
import { HistorialRepositoryImpl } from '../../infrastructure/repositories/historial.repository.impl';
import { HistorialDataSourceImpl } from '../../infrastructure/datasources/historial.datasource.impl';
import { checkPermission } from '../../infrastructure/middlewares/permission.middleware';

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

        const analisisDefectosDataSource = new AnalisisDefectosDataSourceImpl();
        const analisisDefectosRepository = new AnalisisDefectosRespositoryImpl(analisisDefectosDataSource);


        const loteDatasource = new LoteDataSourceImpl();
        const loteRepository = new LoteRepositoryImpl(loteDatasource);
        
        const userDatasource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(userDatasource);

        const pedidoDatasource = new  PedidoDataSourceImpl();
        const pedidoRepository = new PedidoRepositoryImpl(pedidoDatasource);

        const historialDatasource = new HistorialDataSourceImpl();
        const historialRepository = new HistorialRepositoryImpl(historialDatasource);

        const inventarioLoteDatasource = new InventarioLoteDataSourceImpl();
        const inventarioLoteRepository = new InventarioLoteRepositoryImpl(inventarioLoteDatasource);
        
        // Use cases
        const createLoteUseCase = new CreateLote(loteRepository, userRepository, pedidoRepository);

        const loteController = new LoteController(
            createLoteUseCase,
            loteAnalisisRepository,
            muestraRepository,
            analisisRepository,
            analisisFisicoRepository,
            analisisSensorialRepository,
            analisisDefectosRepository,
            loteRepository,
            userRepository,
            pedidoRepository,
            historialRepository,
            inventarioLoteRepository
        );

        router.post('/', authMiddleware,checkPermission('inventario.lotes_verdes.create') , auditMiddleware('Lote', 'CREATE'),loteController.createLote);
        router.post('/rapido', authMiddleware,checkPermission('inventario.lotes_verdes.create'),auditMiddleware('Lote', 'CREATE'), loteController.createLoteRapido);
        router.post('/muestra/:id',authMiddleware,checkPermission('inventario.lotes_verdes.create'), auditMiddleware('Lote', 'CREATE') ,loteController.createLoteFromMuestra);
        router.put('/:id', authMiddleware,checkPermission('inventario.lotes_verdes.update'),auditMiddleware('Lote', 'UPDATE'), loteController.updateLote);
        router.delete('/:id', authMiddleware, checkPermission('inventario.lotes_verdes.delete'),auditMiddleware('Lote', 'DELETE'),loteController.deleteLote);
        
        router.post('/fusionar',authMiddleware, auditMiddleware('Lote', 'CREATE'), loteController.FusionarLotes);
        router.post('/blend',authMiddleware,auditMiddleware('Lote', 'CREATE'),  loteController.blendLotes);
        
        router.get('/tostados', loteController.getAllTostados);
        router.get('/verdes', loteController.getAllVerdes);
        router.get('/inventario', loteController.getLoteInventario);
        router.get('/inventario/:id', loteController.getLoteInventarioById);
        router.get('/roaster', loteController.getLotesRoaster);
        router.get('/user/:id', loteController.getLotesByUserId);
        router.get('/byLote/:id',loteController.getUserByLote);
        router.get('/:id', loteController.getLoteById);
        router.get('/', loteController.getLotes);


        return router;
    }


}