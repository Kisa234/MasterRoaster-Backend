import { Router } from "express";
import { TuesteDataSourceImpl } from "../../infrastructure/datasources/tueste.datasource.impl";
import { TuesteRepositoryImpl } from "../../infrastructure/repositories/tueste.repository.impl";
import { TuesteController } from "./controller";
import { LoteDataSource } from '../../domain/datasources/lote.datasource';
import { LoteDataSourceImpl } from "../../infrastructure/datasources/lote.datasource.impl";
import { LoteRepositoryImpl } from "../../infrastructure/repositories/lote.repository.impl";
import PedidoRepositoryImpl from "../../infrastructure/repositories/pedido.repository.impl";
import { PedidoDataSourceImpl } from "../../infrastructure/datasources/pedido.datasource.impl";
import { LoteTostadoDataSourceImpl } from "../../infrastructure/datasources/loteTostado.datasource.impl";
import { LoteTostadoRepositoryImpl } from "../../infrastructure/repositories/loteTostado.repository.impl";

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

        const tuesteController = new TuesteController(tuesteRepository, loteTostadoDataSource, pedidoRepository,loteRepository);
        
        router.post('/', tuesteController.createTueste);
        router.get('/', tuesteController.getAllTuestes);
        router.get('/:id', tuesteController.getTuesteById);
        router.put('/:id', tuesteController.updateTueste);
        // router.delete('/:id', tuesteController.deleteTueste);
        router.get('/fecha/:fecha', tuesteController.getTuesteByFecha);
        router.put('/c/:id', tuesteController.completarTostados);

        return router;

    }
}