import { Router } from "express";
import { CategoriaDataSourceImpl } from "../../infrastructure/datasources/categoria.datasource.impl";
import { CategoriaRepositoryImpl } from "../../infrastructure/repositories/categoria.repository.impl";
import { CategoriaController } from "./controller";

export class CategoriaRoutes {

    static get routes(): Router {
        const router = Router();

        const categoriaDataSource = new CategoriaDataSourceImpl();
        const categoriaRepository = new CategoriaRepositoryImpl(categoriaDataSource);
        const categoriaController = new CategoriaController(categoriaRepository);

        router.post('/', categoriaController.createCategoria);
        router.get('/:id', categoriaController.getCategoriaById);
        router.get('/', categoriaController.getCategorias);
        router.put('/:id', categoriaController.updateCategoria);
        router.delete('/:id', categoriaController.deleteCategoria);

        return router;
    }
}
