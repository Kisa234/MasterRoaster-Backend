import { Router } from "express";
import { LoteTostadoDataSourceImpl } from "../../infrastructure/datasources/loteTostado.datasource.impl";
import { LoteTostadoRepositoryImpl } from "../../infrastructure/repositories/loteTostado.repository.impl";
import { LoteTostadoController } from "./controller";
import { TuesteDataSourceImpl } from "../../infrastructure/datasources/tueste.datasource.impl";
import PedidoRepositoryImpl from "../../infrastructure/repositories/pedido.repository.impl";
import { PedidoDataSourceImpl } from "../../infrastructure/datasources/pedido.datasource.impl";
import { TuesteRepositoryImpl } from "../../infrastructure/repositories/tueste.repository.impl";

export class LoteTostadoRoutes {
    static get routes() {
        const router = Router();

        const loteDatasource = new LoteTostadoDataSourceImpl();
        const loteTostadoRepository = new LoteTostadoRepositoryImpl(loteDatasource);

        const tuesteDatasource = new TuesteDataSourceImpl();
        const tuesteRepository = new TuesteRepositoryImpl(tuesteDatasource);

        const pedidoDatasource = new PedidoDataSourceImpl();
        const pedidoRepository = new PedidoRepositoryImpl(pedidoDatasource);

        const loteController = new LoteTostadoController(
            loteTostadoRepository,
            tuesteRepository,
            pedidoRepository
        );

        router.post('/', loteController.createLoteTostado);
        router.get('/ficha/:id', loteController.getFichaTueste);
        router.get('/', loteController.getLotesTostados);
        router.get('/:id', loteController.getLoteTostadoById);
        router.put('/:id', loteController.updateLoteTostado);
        router.delete('/:id', loteController.deleteLoteTostado);
        router.get('/lote/:id', loteController.getLotesTostadoByLoteId);
        


        return router;
    }
}