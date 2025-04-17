import { Router } from "express";
import { LoteTostadoDataSourceImpl } from "../../infrastructure/datasources/loteTostado.datasource.impl";
import { LoteTostadoRepositoryImpl } from "../../infrastructure/repositories/loteTostado.repository.impl";
import { LoteTostadoController } from "./controller";

export class LoteTostadoRoutes {
    static get routes() {
        const router = Router();

        const datasource = new LoteTostadoDataSourceImpl();
        const loteTostadoRepository = new LoteTostadoRepositoryImpl(datasource);
        const loteController = new LoteTostadoController(loteTostadoRepository);

        router.post('/', loteController.createLoteTostado);
        router.get('/', loteController.getLotesTostados);
        router.get('/:id', loteController.getLoteTostadoById);
        router.put('/:id', loteController.updateLoteTostado);
        router.delete('/:id', loteController.deleteLoteTostado);
        router.get('/lote/:id', loteController.getLotesTostadoByLoteId);
        


        return router;
    }
}