import { Router } from "express";
import { LoteDataSourceImpl } from "../../infrastructure/datasources/lote.datasource.impl";
import { LoteRepositoryImpl } from "../../infrastructure/repositories/lote.repository.impl";
import { LoteController } from "./controller";
import { MuestraRepositoryImpl } from "../../infrastructure/repositories/muestra.repository.impl";
import { MuestraDataSourceImpl } from "../../infrastructure/datasources/muestra.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { UserDataSourceImpl } from "../../infrastructure/datasources/user.datasource.impl";

export class LoteRoutes{

    static get routes():Router{
        const router = Router();

        const loteDatasource = new LoteDataSourceImpl();
        const loteRepository = new LoteRepositoryImpl(loteDatasource);

        const userDatasource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(userDatasource);

        const muestraDatasource = new MuestraDataSourceImpl();
        const muestraRepository = new MuestraRepositoryImpl(muestraDatasource);

        const loteController = new LoteController(loteRepository,muestraRepository,userRepository);

        router.post('/', loteController.createLote);
        router.post('/muestra/:id', loteController.createLoteFromMuestra);
        router.get('/', loteController.getLotes);
        router.get('/tostados', loteController.getAllTostados);
        router.get('/verdes', loteController.getAllVerdes);
        
        router.get('/:id', loteController.getLoteById);
        router.put('/:id', loteController.updateLote);
        router.delete('/:id', loteController.deleteLote);
        router.get('/user/:id', loteController.getLotesByUserId);

        return router;
    }


}