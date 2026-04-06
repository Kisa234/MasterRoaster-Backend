import { Router } from "express";
import { AlmacenController } from "./controller";

import { AlmacenDataSourceImpl } from "../../../infrastructure/datasources/almacen.datasource.impl";
import { AlmacenRepositoryImpl } from "../../../infrastructure/repositories/almacen.repository.impl";


import { HistorialRepositoryImpl } from "../../../infrastructure/repositories/historial.repository.impl";

import { MovimientoAlmacenRepositoryImpl } from "../../../infrastructure/repositories/movimiento-almacen.repository.impl";

import { InventarioLoteRepositoryImpl } from "../../../infrastructure/repositories/inventario-lote.repository.impl";

import { InventarioLoteTostadoRepositoryImpl } from "../../../infrastructure/repositories/inventario-lote-tostado.repository.impl";

import { InventarioMuestraRepositoryImpl } from "../../../infrastructure/repositories/inventario-muestra.repository.impl";

import { InventarioProductoRepositoryImpl } from "../../../infrastructure/repositories/inventario-producto.repository.impl";

import { InventarioInsumoRepositoryImpl } from "../../../infrastructure/repositories/inventario-insumo.repository.impl";
import { HistorialDataSourceImpl } from "../../../infrastructure/datasources/historial.datasource.impl";
import { MovimientoAlmacenDataSourceImpl } from "../../../infrastructure/datasources/movimiento-almacen.datasource.impl";
import { InventarioLoteDataSourceImpl } from "../../../infrastructure/datasources/inventario-lote.datasource.impl";
import { InventarioLoteTostadoDataSourceImpl } from "../../../infrastructure/datasources/inventario-lote-tostado.datasource.impl";
import { InventarioMuestraDataSourceImpl } from "../../../infrastructure/datasources/inventario-muestra.datasource.impl";
import { InventarioProductoDataSourceImpl } from "../../../infrastructure/datasources/inventario-producto.datasource.impl";
import { InventarioInsumoDataSourceImpl } from "../../../infrastructure/datasources/inventario-insumo.datasource.impl";

export class AlmacenRoutes {

  static get routes(): Router {
    const router = Router();

    // --- Almacén ---
    const almacenDatasource = new AlmacenDataSourceImpl();
    const almacenRepository = new AlmacenRepositoryImpl(almacenDatasource);

    // --- Historial ---
    const historialDatasource = new HistorialDataSourceImpl();
    const historialRepository = new HistorialRepositoryImpl(historialDatasource);

    // --- Movimiento ---
    const movimientoDatasource = new MovimientoAlmacenDataSourceImpl();
    const movimientoRepository = new MovimientoAlmacenRepositoryImpl(movimientoDatasource);

    // --- Inventarios ---
    const inventarioLoteDatasource = new InventarioLoteDataSourceImpl();
    const inventarioLoteRepository = new InventarioLoteRepositoryImpl(inventarioLoteDatasource);

    const inventarioLoteTostadoDatasource = new InventarioLoteTostadoDataSourceImpl();
    const inventarioLoteTostadoRepository = new InventarioLoteTostadoRepositoryImpl(inventarioLoteTostadoDatasource);

    const inventarioMuestraDatasource = new InventarioMuestraDataSourceImpl();
    const inventarioMuestraRepository = new InventarioMuestraRepositoryImpl(inventarioMuestraDatasource);

    const inventarioProductoDatasource = new InventarioProductoDataSourceImpl();
    const inventarioProductoRepository = new InventarioProductoRepositoryImpl(inventarioProductoDatasource);

    const inventarioInsumoDatasource = new InventarioInsumoDataSourceImpl();
    const inventarioInsumoRepository = new InventarioInsumoRepositoryImpl(inventarioInsumoDatasource);

    // --- Controller ---
    const controller = new AlmacenController(
      almacenRepository,
      historialRepository,
      movimientoRepository,
      inventarioLoteRepository,
      inventarioLoteTostadoRepository,
      inventarioMuestraRepository,
      inventarioProductoRepository,
      inventarioInsumoRepository
    );

    // ---- Query routes (específicas primero) ----
    router.get("/activos", controller.getAlmacenesActivos);
    router.post("/ajustar-stock", controller.ajustarStock);
    router.post("/trasladar-stock", controller.trasladarStock);

    // ---- CRUD ----
    router.post("/", controller.createAlmacen);
    router.get("/", controller.getAllAlmacenes);
    router.get("/:id_almacen", controller.getAlmacenById);
    router.patch("/:id_almacen", controller.updateAlmacen);
    router.delete("/:id_almacen", controller.deleteAlmacen);

    return router;
  }
}