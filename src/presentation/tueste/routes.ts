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

export class TuesteRoutes {


    static get routes():Router {

        const router = Router();

        const tuesteDatasource = new TuesteDataSourceImpl();
        const tuesteRepository = new TuesteRepositoryImpl(tuesteDatasource);

        const loteTostadoDataSource = new LoteTostadoDataSourceImpl();
        const loteTostadoRepository = new LoteTostadoRepositoryImpl(loteTostadoDataSource);

        const pedidoDatasource = new PedidoDataSourceImpl();
        const pedidoRepository = new PedidoRepositoryImpl(pedidoDatasource);

        const loteDatasource = new LoteDataSourceImpl();
        const loteRepository = new LoteRepositoryImpl(loteDatasource);

        const c = new CreateLoteTostado(loteTostadoRepository)

        const tuesteController = new TuesteController(tuesteRepository,c, pedidoRepository,loteRepository);
        
        router.post('/',authMiddleware, tuesteController.createTueste);
        router.put('/c/:id',authMiddleware, tuesteController.completarTostados);
        router.put('/:id', authMiddleware,tuesteController.updateTueste);
        router.delete('/:id',authMiddleware, tuesteController.deleteTueste);

        router.get('/', tuesteController.getAllTuestes);
        router.get('/lote/:id', tuesteController.getTuestesByLoteTostado);
        router.get('/ref/:id', tuesteController.getReferenceTueste);
        router.get('/:id', tuesteController.getTuesteById);
        router.get('/fecha/:fecha', tuesteController.getTuesteByFecha);
        router.get('/pedido/:id', tuesteController.getTostadosByPedido);   

        return router;

    }
}