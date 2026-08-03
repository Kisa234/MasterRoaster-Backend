import { Router } from "express";
import { PaqueteItemController } from "./controller";
import { PaqueteItemDataSourceImpl } from "../../infrastructure/datasources/paquete-item.datasource.impl";
import { PaqueteItemRepositoryImpl } from "../../infrastructure/repositories/paquete-item.repository.impl";

// Nota: crear y eliminar un PaqueteItem se hace vía las rutas de Paquete
// (POST /paquete/:id/items y DELETE /paquete/:id/items/:id_item), porque
// esas acciones necesitan validar el estado del Paquete (EN_PREPARACION)
// y el stock disponible antes de tocar la tabla — lógica que vive en
// AgregarItemPaquete / EliminarItemPaquete, no acá.
// Estas rutas son de solo lectura / consulta directa.

export class PaqueteItemRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new PaqueteItemDataSourceImpl();
        const repository = new PaqueteItemRepositoryImpl(datasource);
        const controller = new PaqueteItemController(repository);

        router.get('/paquete/:id_paquete', controller.getByPaquete);
        router.get('/:id', controller.getById);

        return router;
    }
}
