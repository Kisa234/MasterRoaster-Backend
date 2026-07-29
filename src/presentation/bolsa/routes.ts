import { Router } from "express";
import { BolsaController } from "./controller";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";
import { BolsaDataSourceImpl } from "../../infrastructure/datasources/bolsa.datasource.impl";
import { BolsaRepositoryImpl } from "../../infrastructure/repositories/bolsa.repository";
import { InventarioBolsaDataSourceImpl } from "../../infrastructure/datasources/inventario-bolsa.datasource.impl";
import { InventarioBolsaRepositoryImpl } from "../../infrastructure/repositories/inventario-bolsa.repository.impl";

export class BolsaRoutes {

    static get routes(): Router {
        const router = Router();

        const bolsaDatasource = new BolsaDataSourceImpl();
        const bolsaRepository = new BolsaRepositoryImpl(bolsaDatasource);

        const inventarioBolsaDatasource = new InventarioBolsaDataSourceImpl();
        const inventarioBolsaRepository = new InventarioBolsaRepositoryImpl(inventarioBolsaDatasource);

        const bolsaController = new BolsaController(
            bolsaRepository,
            inventarioBolsaRepository,
        );

        // Mutación
        router.post('/', authMiddleware, bolsaController.createBolsa);
        router.put('/:id', authMiddleware, bolsaController.updateBolsa);
        router.delete('/:id', authMiddleware, bolsaController.deleteBolsa);

        // Consultas simples
        router.get('/', bolsaController.getBolsas);
        router.get('/inventario', bolsaController.getBolsaInventario);
        router.get('/inventario/:id', bolsaController.getBolsaInventarioById);
        router.get('/pedido/:id', bolsaController.getBolsasByPedidoId);
        router.get('/lote-tostado/:id', bolsaController.getBolsasByLoteTostadoId);
        router.get('/:id', bolsaController.getBolsaById);

        return router;
    }
}