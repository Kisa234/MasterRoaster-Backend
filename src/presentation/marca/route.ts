import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { MarcaController } from './controller';
import { MarcaDatasourceImpl } from '../../infrastructure/datasources/marca.datasource.impl';
import { MarcaRepositoryImpl } from '../../infrastructure/repositories/marca.repository.impl';

export class MarcaRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new MarcaDatasourceImpl();
    const repository = new MarcaRepositoryImpl(datasource);
    const controller = new MarcaController(repository);

    router.get('/', controller.getAll);
    router.get('/:id_marca', controller.getById);
    router.post('/', controller.create);
    router.put('/:id_marca', controller.update);
    router.delete('/:id_marca', controller.delete);

    return router;
  }
}