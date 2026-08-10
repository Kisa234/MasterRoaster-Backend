import { Router } from "express";
import { EnvioController } from "./controller";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";

import { EnvioDataSourceImpl } from "../../infrastructure/datasources/envio.datasource.impl";
import { DireccionEnvioDataSourceImpl } from "../../infrastructure/datasources/direccion-envio.datasource.impl";
import { PaqueteDataSourceImpl } from "../../infrastructure/datasources/paquete.datasource.impl";
import { PaqueteItemDataSourceImpl } from "../../infrastructure/datasources/paquete-item.datasource.impl";
import { InventarioGenericoDataSourceImpl } from "../../infrastructure/datasources/inventario-generico.datasource.impl";

import { MovimientoAlmacenDataSourceImpl } from "../../infrastructure/datasources/movimiento-almacen.datasource.impl";
import { HistorialDataSourceImpl } from "../../infrastructure/datasources/historial.datasource.impl";
import { EnvioRepositoryImpl } from "../../infrastructure/repositories/envio.repository.impl";
import { DireccionEnvioRepositoryImpl } from "../../infrastructure/repositories/direccion-envio.repository.impl";
import { PaqueteRepositoryImpl } from "../../infrastructure/repositories/paquete.repository.impl";
import { PaqueteItemRepositoryImpl } from "../../infrastructure/repositories/paquete-item.repository.impl";
import { InventarioGenericoRepositoryImpl } from "../../infrastructure/repositories/inventario-generico.repository.impl";
import { MovimientoAlmacenRepositoryImpl } from "../../infrastructure/repositories/movimiento-almacen.repository.impl";
import { HistorialRepositoryImpl } from "../../infrastructure/repositories/historial.repository.impl";

export class EnvioRoutes {
    static get routes(): Router {
        const router = Router();

        const envioRepo = new EnvioRepositoryImpl(new EnvioDataSourceImpl());
        const direccionRepo = new DireccionEnvioRepositoryImpl(new DireccionEnvioDataSourceImpl());
        const paqueteRepo = new PaqueteRepositoryImpl(new PaqueteDataSourceImpl());
        const paqueteItemRepo = new PaqueteItemRepositoryImpl(new PaqueteItemDataSourceImpl());
        const inventarioRepo = new InventarioGenericoRepositoryImpl(new InventarioGenericoDataSourceImpl());
        const movimientoRepo = new MovimientoAlmacenRepositoryImpl(new MovimientoAlmacenDataSourceImpl());
        const historialRepo = new HistorialRepositoryImpl(new HistorialDataSourceImpl());

        const controller = new EnvioController(
            envioRepo, direccionRepo, paqueteRepo, paqueteItemRepo,
            inventarioRepo, movimientoRepo, historialRepo,
        );

        router.post('/', authMiddleware, controller.create);
        router.put('/:id/programar', authMiddleware, controller.programar);
        router.put('/:id/despachar', authMiddleware, controller.despachar);
        router.put('/:id/entregar', authMiddleware, controller.confirmarEntrega);
        router.put('/:id/cancelar', authMiddleware, controller.cancelar);
        router.put('/:id/devolucion', authMiddleware, controller.registrarDevolucion);

        router.get('/', controller.getAll);
        router.get('/por-entidad/:entidad/:id_entidad', controller.getByEntidad); 
        router.get('/:id', controller.getById);

        return router;
    }
}
