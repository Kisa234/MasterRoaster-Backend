import { Router } from "express";
import { MuestraDataSourceImpl } from "../../infrastructure/datasources/muestra.datasource.impl";
import { MuestraRepositoryImpl } from "../../infrastructure/repositories/muestra.repository.impl";
import { MuestraController } from "./controller";
import { UserDataSourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";


export class MuestraRoutes {

    static get routes():Router {
        const router = Router();

        const muestraDatasource = new MuestraDataSourceImpl();
        const muestraRepository = new MuestraRepositoryImpl(muestraDatasource);
        
        const userDatasource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(userDatasource);

        const muestraController = new MuestraController(muestraRepository, userRepository);




        router.post('/',authMiddleware, muestraController.createMuestra);
        router.get('/:id', muestraController.getMuestraById);
        router.put('/:id', muestraController.updateMuestra);
        router.delete('/:id', muestraController.deleteMuestra);
        router.get('/', muestraController.getAllMuestra);

        return router;
        
    }


}