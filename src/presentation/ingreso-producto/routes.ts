import { Router } from "express";
import { IngresoProductoController } from "./controller";
import { IngresoProductoDataSourceImpl } from "../../infrastructure/datasources/ingreso-producto.datasource.impl";
import { IngresoProductoRepositoryImpl } from "../../infrastructure/repositories/ingreso-producto.repository.impl";
import { MovimientoAlmacenRepositoryImpl } from "../../infrastructure/repositories/movimiento-almacen.repository.impl";
import { MovimientoAlmacenDataSourceImpl } from "../../infrastructure/datasources/movimiento-almacen.datasource.impl";
import { InventarioProductoDataSourceImpl } from "../../infrastructure/datasources/inventario-producto.datasource.impl";
import { AlmacenDataSourceImpl } from "../../infrastructure/datasources/almacen.datasource.impl";
import { AlmacenRepositoryImpl } from "../../infrastructure/repositories/almacen.repository.impl";
import { InventarioProductoRepositoryImpl } from "../../infrastructure/repositories/inventario-producto.repository.impl";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";


export class IngresoProductoRoutes {

  static get routes(): Router {
    const router = Router();

    // Infra
    const ingresoDatasource = new IngresoProductoDataSourceImpl();
    const ingresoRepository = new IngresoProductoRepositoryImpl(ingresoDatasource);

    const almacenDatasource = new AlmacenDataSourceImpl();
    const almacenRepository = new AlmacenRepositoryImpl(almacenDatasource);

    const inventarioProductoDatasource = new InventarioProductoDataSourceImpl();
    const inventarioProductoRepository = new InventarioProductoRepositoryImpl(inventarioProductoDatasource);  

    const movimientoAlmacenDatasource = new MovimientoAlmacenDataSourceImpl();
    const movimientoAlmacenRepository = new MovimientoAlmacenRepositoryImpl(movimientoAlmacenDatasource);

    // Controller
    const controller = new IngresoProductoController(
      ingresoRepository,
      almacenRepository,
      inventarioProductoRepository,
      movimientoAlmacenRepository
      );

    // Routes
    router.post("/", authMiddleware, controller.createIngreso);
    router.put("/:id_ingreso",authMiddleware ,controller.updateIngreso);
    router.get("/almacen/:id_almacen",authMiddleware ,controller.getByAlmacen);
    router.get("/producto/:id_producto",authMiddleware, controller.getByProducto);

    return router;
  }
}
