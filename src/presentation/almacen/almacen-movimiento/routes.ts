import { Router } from "express";
import { MovimientoAlmacenController } from "./controller";
import { MovimientoAlmacenDataSourceImpl } from "../../../infrastructure/datasources/movimiento-almacen.datasource.impl";
import { MovimientoAlmacenRepositoryImpl } from "../../../infrastructure/repositories/movimiento-almacen.repository.impl";


export class MovimientoAlmacenRoutes {

  static get routes(): Router {
    const router = Router();

    // Infra
    const movimientoDatasource = new MovimientoAlmacenDataSourceImpl();
    const movimientoRepository = new MovimientoAlmacenRepositoryImpl(movimientoDatasource);

    // Controller
    const controller = new MovimientoAlmacenController(movimientoRepository);

    // ---- Query routes (específicas primero) ----
    router.get("/entidad/:entidad/:id_entidad", controller.getMovimientosByEntidad);
    router.get("/almacen/:id_almacen", controller.getMovimientosByAlmacen);
    router.get("/rango-fecha", controller.getMovimientosByFechaRange);

    // ---- CRUD ----
    router.post("/", controller.createMovimiento);
    router.get("/", controller.getAllMovimientos);
    router.get("/:id_movimiento", controller.getMovimientoById);

    return router;
  }
}
