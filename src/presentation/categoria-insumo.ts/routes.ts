import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { CategoriaInsumoController } from './controller';
import { CategoriaInsumoRepositoryImpl } from '../../infrastructure/repositories/categoria-insumo.repository.impl';
import { CategoriaInsumoDatasourceImpl } from '../../infrastructure/datasources/categoria-insumo.datasource.impl';


export class categoriaInsumoRoutes {
    static get routes() {

        const router = Router();
        
        const datasource = new CategoriaInsumoDatasourceImpl();
        const repository = new CategoriaInsumoRepositoryImpl(datasource);
        const controller = new CategoriaInsumoController(repository);
        
        router.get('/', controller.getAll);
        router.get('/:id_categoria', controller.getById);
        router.post('/', controller.create);
        router.put('/:id_categoria', controller.update);
        router.delete('/:id_categoria', controller.delete);
        
        return router;
    }
};