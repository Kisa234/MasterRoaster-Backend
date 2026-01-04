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
import { InventarioDataSourceImpl } from '../../infrastructure/datasources/inventario.datasource.impl';
import { InventarioRepositoryImpl } from '../../infrastructure/repositories/inventario.repository.impl';
import { authMiddleware } from '../../infrastructure/middlewares/auth.middleware';
import { LoteTostadoDataSourceImpl } from '../../infrastructure/datasources/loteTostado.datasource.impl';
import { LoteTostadoRepositoryImpl } from '../../infrastructure/repositories/loteTostado.repository.impl';

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
        // Tueste
        const TuesteDatasource = new TuesteDataSourceImpl();
        const TuesteRepository = new TuesteRepositoryImpl(TuesteDatasource);
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
        const InventarioDatasource = new InventarioDataSourceImpl();
        const InventarioRepository = new InventarioRepositoryImpl(InventarioDatasource);

        // LoteTostado
        const LoteTostadoDatasource = new LoteTostadoDataSourceImpl();
        const LoteTostadoRepository = new LoteTostadoRepositoryImpl(LoteTostadoDatasource);

        const createLote = new CreateLote(LoteRepository, UserRepository, PedidoRepository);
        const duplicateLote = new DuplicateLote(LoteRepository, createLote, AnalisisRepository, AnalisisFisicoRepository, AnalisisSensorialRepository, AnalisisDefectosRepository, LoteAnalisisRepository);

        const controller = new PedidoController(
            PedidoRepository,
            LoteRepository,
            UserRepository,
            TuesteRepository,
            AnalisisRepository,
            AnalisisFisicoRepository,
            duplicateLote,
            InventarioRepository,
            LoteTostadoRepository
        );

        // Definición de rutas
        
        router.get('/orden/tueste', controller.getPedidosOrdenTueste);
        router.get('/orden/tueste/:fecha', controller.getPedidosOrdenTuesteByFecha);
        router.get('/estado/:estado', controller.getPedidosByEstado);
        router.get('/cliente/:cliente_id', controller.getPedidosByCliente);
        router.get('/lote/:id_lote', controller.GetPedidosByLote);
        router.put('/completar/:id', controller.completarPedido);
        router.put('/facturar/:id_pedido', controller.SetPedidoFacturado)


        router.post('/', controller.createPedido);
        router.get('/', controller.getAllPedidos);
        router.get('/:id', controller.getPedidoById);
        router.put('/:id', controller.updatePedido);
        router.delete('/:id', controller.deletePedido);
        return router;

    }
}