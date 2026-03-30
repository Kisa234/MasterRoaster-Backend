import { CompletarPedido, CompletarPedidoUseCase } from './../../domain/usecases/pedido/complete-pedido';
import { Router } from "express";
import { TuesteDataSourceImpl } from "../../infrastructure/datasources/tueste.datasource.impl";
import { TuesteRepositoryImpl } from "../../infrastructure/repositories/tueste.repository.impl";
import { TuesteController } from "./controller";
import { LoteDataSourceImpl } from "../../infrastructure/datasources/lote.datasource.impl";
import { LoteRepositoryImpl } from "../../infrastructure/repositories/lote.repository.impl";
import PedidoRepositoryImpl from "../../infrastructure/repositories/pedido.repository.impl";
import { PedidoDataSourceImpl } from "../../infrastructure/datasources/pedido.datasource.impl";
import { LoteTostadoDataSourceImpl } from "../../infrastructure/datasources/loteTostado.datasource.impl";
import { LoteTostadoRepositoryImpl } from "../../infrastructure/repositories/loteTostado.repository.impl";
import { CreateLoteTostado } from "../../domain/usecases/lote/lote-tostado/create-lote-tostado";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";
import { InventarioLoteDataSourceImpl } from '../../infrastructure/datasources/inventario-lote.datasource.impl';
import { InventarioLoteRepositoryImpl } from '../../infrastructure/repositories/inventario-lote.repository.impl';
import { InventarioLoteTostadoDataSourceImpl } from '../../infrastructure/datasources/inventario-lote-tostado.datasource.impl';
import { UserDataSourceImpl } from '../../infrastructure/datasources/user.datasource.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { InventarioLoteTostadoRepositoryImpl } from '../../infrastructure/repositories/inventario-lote-tostado.repository.impl';
import { AnalisisDataSourceImpl } from '../../infrastructure/datasources/analisis.datasource.impl';
import { AnalisisRepositoryImpl } from '../../infrastructure/repositories/analisis.repository.impl';
import { AnalisisFisicoDataSourceImpl } from '../../infrastructure/datasources/analisisFisico.datasource.impl';
import { AnalisisFisicoRepositoryImpl } from '../../infrastructure/repositories/analisisFisico.repository.impl';
import { AnalisisSensorialDataSourceImpl } from '../../infrastructure/datasources/analisisSensorial.datasource.impl';
import { AnalisisSensorialRepositoryImpl } from '../../infrastructure/repositories/analisisSensorial.repository.impl';
import { AnalisisDefectosDataSourceImpl } from '../../infrastructure/datasources/analisisDefectos.datasource.impl';
import { AnalisisDefectosRespositoryImpl } from '../../infrastructure/repositories/analisisDefectos.repository.impl';
import { LoteAnalisisDataSourceImpl } from '../../infrastructure/datasources/lote-analisis.datasource.impl';
import { LoteAnalisisRepositoryImpl } from '../../infrastructure/repositories/lote-analisis.repository.impl';
import { InventarioProductoDataSourceImpl } from '../../infrastructure/datasources/inventario-producto.datasource.impl';
import { InventarioProductoRepositoryImpl } from '../../infrastructure/repositories/inventario-producto.repository.impl';
import { HistorialDataSourceImpl } from '../../infrastructure/datasources/historial.datasource.impl';
import { HistorialRepositoryImpl } from '../../infrastructure/repositories/historial.repository.impl';
import { MovimientoAlmacenDataSourceImpl } from '../../infrastructure/datasources/movimiento-almacen.datasource.impl';
import { MovimientoAlmacenRepositoryImpl } from '../../infrastructure/repositories/movimiento-almacen.repository.impl';
import { DuplicateLote } from '../../domain/usecases/lote/lote/duplicar-lote';
import { CreateLote } from '../../domain/usecases/lote/lote/create-lote';

export class TuesteRoutes {


    static get routes(): Router {

        const router = Router();

        const tuesteDatasource = new TuesteDataSourceImpl();
        const tuesteRepository = new TuesteRepositoryImpl(tuesteDatasource);

        const loteTostadoDataSource = new LoteTostadoDataSourceImpl();
        const loteTostadoRepository = new LoteTostadoRepositoryImpl(loteTostadoDataSource);

        const pedidoDatasource = new PedidoDataSourceImpl();
        const pedidoRepository = new PedidoRepositoryImpl(pedidoDatasource);

        const loteDatasource = new LoteDataSourceImpl();
        const loteRepository = new LoteRepositoryImpl(loteDatasource);

        // Pedido
        const PedidoDatasource = new PedidoDataSourceImpl();
        const PedidoRepository = new PedidoRepositoryImpl(PedidoDatasource);
        // Lote
        const LoteDatasource = new LoteDataSourceImpl();
        const LoteRepository = new LoteRepositoryImpl(LoteDatasource);
        // LoteInventario
        const inventarioLoteDatasource = new InventarioLoteDataSourceImpl();
        const inventarioLoteRepository = new InventarioLoteRepositoryImpl(inventarioLoteDatasource);
        // Tueste
        const TuesteDatasource = new TuesteDataSourceImpl();
        const TuesteRepository = new TuesteRepositoryImpl(TuesteDatasource);

        // TuesteInventario
        const inventarioTostadoDatasource = new InventarioLoteTostadoDataSourceImpl();
        const inventarioTostadoRepository = new InventarioLoteTostadoRepositoryImpl(inventarioTostadoDatasource);
        // User
        const Userdatasource = new UserDataSourceImpl();
        const UserRepository = new UserRepositoryImpl(Userdatasource);

        // Analisis
        const AnalisisDatasource = new AnalisisDataSourceImpl();
        const AnalisisRepository = new AnalisisRepositoryImpl(AnalisisDatasource);

        // AnalisisFisico
        const AnalisisFisicoDatasource = new AnalisisFisicoDataSourceImpl();
        const AnalisisFisicoRepository = new AnalisisFisicoRepositoryImpl(AnalisisFisicoDatasource);

        // AnalisisSensorial
        const AnalisisSensorialDatasource = new AnalisisSensorialDataSourceImpl();
        const AnalisisSensorialRepository = new AnalisisSensorialRepositoryImpl(AnalisisSensorialDatasource);

        // AnalisisDefectos
        const AnalisisDefectosDatasource = new AnalisisDefectosDataSourceImpl();
        const AnalisisDefectosRepository = new AnalisisDefectosRespositoryImpl(AnalisisDefectosDatasource);

        // LoteAnalisis
        const LoteAnalisisDatasource = new LoteAnalisisDataSourceImpl();
        const LoteAnalisisRepository = new LoteAnalisisRepositoryImpl(LoteAnalisisDatasource);

        // LoteTostado
        const LoteTostadoDatasource = new LoteTostadoDataSourceImpl();
        const LoteTostadoRepository = new LoteTostadoRepositoryImpl(LoteTostadoDatasource);

        // Inventario
        const inventarioDatasource = new InventarioProductoDataSourceImpl();
        const inventarioRepository = new InventarioProductoRepositoryImpl(inventarioDatasource);

        //Historial
        const historialDataSource = new HistorialDataSourceImpl();
        const historialRepository = new HistorialRepositoryImpl(historialDataSource);

        //MovimientoAlmacen 
        const movimientoAlmacenDataSource = new MovimientoAlmacenDataSourceImpl();
        const movimientoAlmacenRepository = new MovimientoAlmacenRepositoryImpl(movimientoAlmacenDataSource);


        const createLoteUseCase = new CreateLote(
            LoteRepository,
            UserRepository,
            PedidoRepository,
            historialRepository,
            movimientoAlmacenRepository,
            inventarioLoteRepository
        );

        const duplicateLote = new DuplicateLote(
            LoteRepository, createLoteUseCase,
            AnalisisRepository, AnalisisFisicoRepository,
            AnalisisSensorialRepository,
            AnalisisDefectosRepository,
            LoteAnalisisRepository);


        const completarPedidoUseCase = new CompletarPedido(
            pedidoRepository,
            loteRepository,
            loteTostadoRepository,
            inventarioLoteRepository,
            inventarioTostadoRepository,
            duplicateLote,
            inventarioRepository,
            historialRepository,
            movimientoAlmacenRepository,
            tuesteRepository,
        );


        const tuesteController = new TuesteController(tuesteRepository, pedidoRepository, completarPedidoUseCase);

        router.post('/', authMiddleware, tuesteController.createTueste);
        router.put('/c/:id', authMiddleware, tuesteController.completarTostados);
        router.put('/:id', authMiddleware, tuesteController.updateTueste);
        router.delete('/:id', authMiddleware, tuesteController.deleteTueste);

        router.get('/', tuesteController.getAllTuestes);
        router.get('/lote/:id', tuesteController.getTuestesByLoteTostado);
        router.get('/ref/:id', tuesteController.getReferenceTueste);
        router.get('/:id', tuesteController.getTuesteById);
        router.get('/fecha/:fecha', tuesteController.getTuesteByFecha);
        router.get('/pedido/:id', tuesteController.getTostadosByPedido);

        return router;

    }
}