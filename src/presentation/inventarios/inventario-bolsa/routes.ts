import { Router } from "express";
import { InventarioBolsaController } from "./controller";
import { InventarioBolsaDataSourceImpl } from "../../../infrastructure/datasources/inventario-bolsa.datasource.impl";
import { InventarioBolsaRepositoryImpl } from "../../../infrastructure/repositories/inventario-bolsa.repository.impl";

export class InventarioBolsaRoutes {

    static get routes(): Router {
        const router = Router();

        // Infra
        const inventarioDatasource = new InventarioBolsaDataSourceImpl();
        const inventarioRepository = new InventarioBolsaRepositoryImpl(inventarioDatasource);

        // Controller
        const controller = new InventarioBolsaController(inventarioRepository);

        // ---- Routes ----
        router.post("/", controller.createInventario);
        router.get("/", controller.getAllInventarios);
        router.get("/almacen/:id_almacen", controller.getByAlmacen);
        router.get("/bolsa/:id_bolsa", controller.getByBolsa);
        router.get("/bolsa/:id_bolsa/almacen/:id_almacen", controller.getByBolsaAndAlmacen);
        router.put("/:id_inventario", controller.updateInventario);

        return router;
    }
}
