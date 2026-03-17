import { HistorialRepositoryImpl } from './../../infrastructure/repositories/historial.repository.impl';
import { HistorialDataSourceImpl } from './../../infrastructure/datasources/historial.datasource.impl';
import { Historial } from '@prisma/client';
import { Router } from 'express';
import { PedidoController } from './controller';
import { PedidoDataSourceImpl } from '../../infrastructure/datasources/pedido.datasource.impl';
import { LoteDataSourceImpl } from '../../infrastructure/datasources/lote.datasource.impl';
import { LoteRepositoryImpl } from '../../infrastructure/repositories/lote.repository.impl';
import { TuesteDataSourceImpl } from '../../infrastructure/datasources/tueste.datasource.impl';
import { TuesteRepositoryImpl } from '../../infrastructure/repositories/tueste.repository.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UserDataSourceImpl } from '../../infrastructure/datasources/user.datasource.impl';
import { CreateLote } from '../../domain/usecases/lote/lote/create-lote';
import { AnalisisDataSourceImpl } from '../../infrastructure/datasources/analisis.datasource.impl';
import { AnalisisRepositoryImpl } from '../../infrastructure/repositories/analisis.repository.impl';
import { AnalisisFisicoDataSourceImpl } from '../../infrastructure/datasources/analisisFisico.datasource.impl';
import { AnalisisFisicoRepositoryImpl } from '../../infrastructure/repositories/analisisFisico.repository.impl';
import { LoteAnalisisRepositoryImpl } from '../../infrastructure/repositories/lote-analisis.repository.impl';
import { AnalisisSensorialDataSourceImpl } from '../../infrastructure/datasources/analisisSensorial.datasource.impl';
import { AnalisisSensorialRepositoryImpl } from '../../infrastructure/repositories/analisisSensorial.repository.impl';
import { AnalisisDefectosDataSourceImpl } from '../../infrastructure/datasources/analisisDefectos.datasource.impl';
import { AnalisisDefectosRespositoryImpl } from '../../infrastructure/repositories/analisisDefectos.repository.impl';
import { LoteAnalisisDataSourceImpl } from '../../infrastructure/datasources/lote-analisis.datasource.impl';
import PedidoRepositoryImpl from '../../infrastructure/repositories/pedido.repository.impl';
import { DuplicateLote } from '../../domain/usecases/lote/lote/duplicar-lote';
import { InventarioProductoDataSourceImpl } from '../../infrastructure/datasources/inventario-producto.datasource.impl';
import { authMiddleware } from '../../infrastructure/middlewares/auth.middleware';
import { LoteTostadoDataSourceImpl } from '../../infrastructure/datasources/loteTostado.datasource.impl';
import { LoteTostadoRepositoryImpl } from '../../infrastructure/repositories/loteTostado.repository.impl';
import { InventarioLoteRepositoryImpl } from '../../infrastructure/repositories/inventario-lote.repository.impl';
import { InventarioLoteDataSourceImpl } from '../../infrastructure/datasources/inventario-lote.datasource.impl';
import { InventarioLoteTostadoDataSource } from '../../domain/datasources/inventario-lote-tostado.datasource';
import { InventarioLoteTostadoRepositoryImpl } from '../../infrastructure/repositories/inventario-lote-tostado.repository.impl';
import { InventarioLoteTostadoDataSourceImpl } from '../../infrastructure/datasources/inventario-lote-tostado.datasource.impl';
import { InventarioProductoRepositoryImpl } from '../../infrastructure/repositories/inventario-producto.repository.impl';

export class PedidoRoutes {


    static get routes(): Router {

        const router = Router();

        // Inyección de dependencias
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

        // Inventario
        const InventarioDatasource = new InventarioProductoDataSourceImpl();
        const InventarioRepository = new InventarioProductoRepositoryImpl(InventarioDatasource);

        // LoteTostado
        const LoteTostadoDatasource = new LoteTostadoDataSourceImpl();
        const LoteTostadoRepository = new LoteTostadoRepositoryImpl(LoteTostadoDatasource);

        const HistorialDataSource = new HistorialDataSourceImpl();
        const HistorialRepository = new HistorialRepositoryImpl(HistorialDataSource);

        const createLote = new CreateLote(LoteRepository, UserRepository, PedidoRepository);
        const duplicateLote = new DuplicateLote(LoteRepository, createLote, AnalisisRepository, AnalisisFisicoRepository, AnalisisSensorialRepository, AnalisisDefectosRepository, LoteAnalisisRepository);

        const controller = new PedidoController(
            PedidoRepository,
            LoteRepository,
            inventarioLoteRepository,
            UserRepository,
            TuesteRepository,
            AnalisisRepository,
            AnalisisFisicoRepository,
            duplicateLote,
            InventarioRepository,
            LoteTostadoRepository,
            inventarioTostadoRepository,
            HistorialRepository
        );

        // Definición de rutas

        router.get('/orden/tueste', authMiddleware, controller.getPedidosOrdenTueste);
        router.get('/orden/tueste/:fecha', authMiddleware, controller.getPedidosOrdenTuesteByFecha);
        router.get('/estado/:estado',authMiddleware, controller.getPedidosByEstado);
        router.get('/cliente/:cliente_id',authMiddleware, controller.getPedidosByCliente);
        router.get('/lote/:id_lote',authMiddleware, controller.GetPedidosByLote);
        router.put('/completar/:id',authMiddleware, controller.completarPedido);
        router.put('/facturar/:id_pedido',authMiddleware, controller.SetPedidoFacturado);


        router.post('/', controller.createPedido);
        router.get('/', controller.getAllPedidos);
        router.get('/:id', controller.getPedidoById);
        router.put('/:id', controller.updatePedido);
        router.delete('/:id', controller.deletePedido);
        return router;

    }
}