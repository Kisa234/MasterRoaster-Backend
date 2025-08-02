import { Router } from "express";
import { VariedadDataSourceImpl } from "../../infrastructure/datasources/variedad.datasource.impl";
import { VariedadRepositoryImpl } from "../../infrastructure/repositories/variedad.repository.impl";
import { VariedadController } from "./controller";

export class VariedadRoutes{

    static get routes():Router{
        const router = Router();

        const datasource = new VariedadDataSourceImpl();
        const variedadRepository = new VariedadRepositoryImpl(datasource);
        
        const variedadController = new VariedadController(variedadRepository);

        router.post('/', variedadController.createVariedad);
        router.put('/:id', variedadController.updateVariedad);
        router.delete('/:id', variedadController.deleteVariedad);
        router.get('/', variedadController.getAllVariedades);
        router.get('/:nombre', variedadController.getVariedadByNombre);

        return router;
    }


}