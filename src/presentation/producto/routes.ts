import { Router, Request, Response, NextFunction } from "express";
import { LoteDataSourceImpl } from "../../infrastructure/datasources/lote.datasource.impl";
import { LoteRepositoryImpl } from "../../infrastructure/repositories/lote.repository.impl";
import { UserDataSourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { ProductoDataSourceImpl } from "../../infrastructure/datasources/producto.datasource.impl";
import { ProductoRepositoryImpl } from "../../infrastructure/repositories/producto.repository.impl";
import { ProductoController } from "./controller";


export class ProductoRoutes {
    static get routes() {
        const router = Router();

        const loteDatasource = new LoteDataSourceImpl();
        const loteRepository = new LoteRepositoryImpl(loteDatasource);

        const userDatasource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(userDatasource);

        const productoDatasoure = new ProductoDataSourceImpl();
        const productoRepository = new ProductoRepositoryImpl(productoDatasoure);

        const controller = new ProductoController(
            productoRepository,
            loteRepository,
            userRepository
        )

        // CREATE
        router.post("/", controller.create);

        // READ
        router.get("/", controller.list);
        router.get("/activos", controller.listActivos);
        router.get("/lote/:id_lote", controller.listByLote);
        router.get("/search", controller.search);
        router.get("/:id", controller.getById);

        // UPDATE
        router.patch("/:id", controller.update);
        router.patch("/:id/activo", controller.toggleActivo);
        router.patch("/:id/lote", controller.vincularLote);

        // DELETE (baja lógica en tu datasource impl)
        router.delete("/:id", controller.delete);

        return router;
    }
}
