import { InventarioMuestraDataSourceImpl } from './../../infrastructure/datasources/inventario-muestra.datasource.impl';
import { Router } from "express";
import { MuestraDataSourceImpl } from "../../infrastructure/datasources/muestra.datasource.impl";
import { MuestraRepositoryImpl } from "../../infrastructure/repositories/muestra.repository.impl";
import { MuestraController } from "./controller";
import { UserDataSourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";
import { HistorialRepositoryImpl } from "../../infrastructure/repositories/historial.repository.impl";
import { HistorialDataSourceImpl } from "../../infrastructure/datasources/historial.datasource.impl";
import { InventarioMuestraRepositoryImpl } from "../../infrastructure/repositories/inventario-muestra.repository.impl";


export class MuestraRoutes {

    static get routes(): Router {
        const router = Router();

        const muestraDatasource = new MuestraDataSourceImpl();
        const muestraRepository = new MuestraRepositoryImpl(muestraDatasource);

        const userDatasource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(userDatasource);

        const historialDatasource = new HistorialDataSourceImpl();
        const historialRepository = new HistorialRepositoryImpl(historialDatasource);

        const inventarioMuestraDatasource = new InventarioMuestraDataSourceImpl();
        const inventarioMuestraRepository = new InventarioMuestraRepositoryImpl(inventarioMuestraDatasource);

        const muestraController = new MuestraController(muestraRepository, userRepository, historialRepository, inventarioMuestraRepository);


        router.post('/', authMiddleware, muestraController.createMuestra);
        router.put('/:id', authMiddleware, muestraController.updateMuestra);
        router.patch('/complete/:id', authMiddleware, muestraController.completeMuestra);
        router.delete('/:id', authMiddleware, muestraController.deleteMuestra);
        router.get('/inventario', muestraController.getMuestrasConInventario);
        router.get('/:id', muestraController.getMuestraById);
        router.get('/', muestraController.getAllMuestra);


        return router;

    }


}