import { Router } from "express";
import { IngresoInsumoController } from "./controller";
import { IngresoInsumoDataSourceImpl } from "../../infrastructure/datasources/ingreso-insumo.datasource.impl";
import { IngresoInsumoRepositoryImpl } from "../../infrastructure/repositories/ingreso-insumo.repository.impl";
import { MovimientoAlmacenRepositoryImpl } from "../../infrastructure/repositories/movimiento-almacen.repository.impl";
import { MovimientoAlmacenDataSourceImpl } from "../../infrastructure/datasources/movimiento-almacen.datasource.impl";
import { InventarioInsumoDataSourceImpl } from "../../infrastructure/datasources/inventario-insumo.datasource.impl";
import { InventarioInsumoRepositoryImpl } from "../../infrastructure/repositories/inventario-insumo.repository.impl";
import { AlmacenDataSourceImpl } from "../../infrastructure/datasources/almacen.datasource.impl";
import { AlmacenRepositoryImpl } from "../../infrastructure/repositories/almacen.repository.impl";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";

export class IngresoInsumoRoutes {

  static get routes(): Router {
    const router = Router();

    // Infra
    const ingresoDatasource = new IngresoInsumoDataSourceImpl();
    const ingresoRepository = new IngresoInsumoRepositoryImpl(ingresoDatasource);

    const almacenDatasource = new AlmacenDataSourceImpl();
    const almacenRepository = new AlmacenRepositoryImpl(almacenDatasource);

    const inventarioInsumoDatasource = new InventarioInsumoDataSourceImpl();
    const inventarioInsumoRepository = new InventarioInsumoRepositoryImpl(inventarioInsumoDatasource);

    const movimientoAlmacenDatasource = new MovimientoAlmacenDataSourceImpl();
    const movimientoAlmacenRepository = new MovimientoAlmacenRepositoryImpl(movimientoAlmacenDatasource);

    // Controller
    const controller = new IngresoInsumoController(
      ingresoRepository,
      almacenRepository,
      inventarioInsumoRepository,
      movimientoAlmacenRepository
    );

    // Routes
    router.post("/", authMiddleware, controller.createIngreso);
    router.put("/:id_ingreso", authMiddleware, controller.updateIngreso);
    router.get("/almacen/:id_almacen", authMiddleware, controller.getByAlmacen);
    router.get("/insumo/:id_insumo", authMiddleware, controller.getByInsumo);

    return router;
  }
}