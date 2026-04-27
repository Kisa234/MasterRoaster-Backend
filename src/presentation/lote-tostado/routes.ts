import { Router } from "express";
import { LoteTostadoDataSourceImpl } from "../../infrastructure/datasources/loteTostado.datasource.impl";
import { LoteTostadoRepositoryImpl } from "../../infrastructure/repositories/loteTostado.repository.impl";
import { LoteTostadoController } from "./controller";
import { TuesteDataSourceImpl } from "../../infrastructure/datasources/tueste.datasource.impl";
import PedidoRepositoryImpl from "../../infrastructure/repositories/pedido.repository.impl";
import { PedidoDataSourceImpl } from "../../infrastructure/datasources/pedido.datasource.impl";
import { TuesteRepositoryImpl } from "../../infrastructure/repositories/tueste.repository.impl";
import { HistorialDataSourceImpl } from "../../infrastructure/datasources/historial.datasource.impl";
import { HistorialRepositoryImpl } from "../../infrastructure/repositories/historial.repository.impl";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";

export class LoteTostadoRoutes {
    static get routes() {
        const router = Router();

        const loteDatasource = new LoteTostadoDataSourceImpl();
        const loteTostadoRepository = new LoteTostadoRepositoryImpl(loteDatasource);

        const tuesteDatasource = new TuesteDataSourceImpl();
        const tuesteRepository = new TuesteRepositoryImpl(tuesteDatasource);

        const pedidoDatasource = new PedidoDataSourceImpl();
        const pedidoRepository = new PedidoRepositoryImpl(pedidoDatasource);

        const historialDatasource = new HistorialDataSourceImpl();
        const historialRepository = new HistorialRepositoryImpl(historialDatasource);


        const loteController = new LoteTostadoController(
            loteTostadoRepository,
            tuesteRepository,
            pedidoRepository,
            historialRepository
        );

        // CREATE / UPDATE / DELETE
        router.post('/', authMiddleware, loteController.createLoteTostado);
        router.put('/:id', authMiddleware, loteController.updateLoteTostado);
        router.delete('/:id', authMiddleware, loteController.deleteLoteTostado);

        // GET específicos
        router.get('/lote-con-lote', loteController.getLotesTostadoandLote);
        router.get('/inventario', loteController.getLotesTostadosConInventario);
        router.get('/inventario/:id', loteController.getLoteTostadoConInventario);
        router.get('/ficha/:id', loteController.getFichaTueste);
        router.get('/lote/:id', loteController.getLotesTostadoByLoteId);

        // GET general
        router.get('/', loteController.getLotesTostados);
        router.get('/:id', loteController.getLoteTostadoById);


        return router;
    }
}