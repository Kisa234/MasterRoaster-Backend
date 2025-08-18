import { Router } from "express";
import { EnvioDataSourceImpl } from "../../infrastructure/datasources/envio.datasource.impl";
import { EnvioRepositoryImpl } from "../../infrastructure/repositories/envio.repository.impl";
import { LoteTostadoDataSourceImpl } from "../../infrastructure/datasources/loteTostado.datasource.impl";
import { LoteTostadoRepositoryImpl } from "../../infrastructure/repositories/loteTostado.repository.impl";
import { EnvioController } from "./controller";

export class EnvioRoutes {
  static get routes(): Router {
    const router = Router();

    // Infra
    const envioDatasource = new EnvioDataSourceImpl();
    const envioRepository = new EnvioRepositoryImpl(envioDatasource);

    const loteTostadoDatasource = new LoteTostadoDataSourceImpl();
    const loteTostadoRepository = new LoteTostadoRepositoryImpl(loteTostadoDatasource);

    // Controller
    const controller = new EnvioController(envioRepository, loteTostadoRepository);

    // ---- CRUD ----
    router.post("/", controller.createEnvio);
    router.get("/:id_envio", controller.getEnvioById);
    router.put("/:id_envio", controller.updateEnvio);
    router.delete("/:id_envio", controller.deleteEnvio);
    
    // ---- Query routes (específicas primero) ----
    router.get("/lote/:id_lote_tostado", controller.getEnviosByLote);
    router.get("/cliente/:id_cliente", controller.getEnviosByCliente);
    router.get("/rango-fecha", controller.getEnviosByFechaRange);
    router.get("/clasificacion/:clasificacion", controller.getEnviosByClasificacion);
    
    return router;
  }
}
