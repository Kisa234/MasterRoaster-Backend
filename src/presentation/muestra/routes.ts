import { Router } from "express";
import { MuestraDataSourceImpl } from "../../infrastructure/datasources/muestra.datasource.impl";
import { MuestraRepositoryImpl } from "../../infrastructure/repositories/muestra.repository.impl";
import { MuestraController } from "./controller";


export class MuestraRoutes {

    static get routes():Router {
        const router = Router();

        const datasource = new MuestraDataSourceImpl();
        const muestraRepository = new MuestraRepositoryImpl(datasource);
        const muestraController = new MuestraController(muestraRepository);


        router.post('/', muestraController.createMuestra);
        router.get('/:id', muestraController.getMuestraById);
        router.put('/:id', muestraController.updateMuestra);
        router.delete('/:id', muestraController.deleteMuestra);
        router.get('/', muestraController.getMuestras);

        return router;
        
    }


}