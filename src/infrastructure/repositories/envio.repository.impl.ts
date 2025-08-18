import { EnvioDataSource } from "../../domain/datasources/envio.datasource";
import { CreateEnvioDto } from "../../domain/dtos/envio/create";
import { UpdateEnvioDto } from "../../domain/dtos/envio/update";
import { EnvioEntity, ClasificacionEnvio } from "../../domain/entities/envio.entity";
import { EnvioRepository } from "../../domain/repository/envio.repository";

export class EnvioRepositoryImpl implements EnvioRepository{
    constructor(
        private readonly envioDatasource: EnvioDataSource
    ){}

    createEnvio(dto: CreateEnvioDto): Promise<EnvioEntity> {
       return this.envioDatasource.createEnvio(dto);
    }
    getEnvioById(id_envio: string): Promise<EnvioEntity | null> {
        return this.envioDatasource.getEnvioById(id_envio);
    }
    updateEnvio(id_envio: string, dto: UpdateEnvioDto): Promise<EnvioEntity> {
        return this.envioDatasource.updateEnvio(id_envio,dto);
    }
    deleteEnvio(id_envio: string): Promise<EnvioEntity> {
        return this.envioDatasource.deleteEnvio(id_envio);
    }
    getEnviosByLote(id_lote_tostado: string): Promise<EnvioEntity[]> {
        return this.getEnviosByLote(id_lote_tostado);
    }
    getEnviosByCliente(id_cliente: string): Promise<EnvioEntity[]> {
        return this.getEnviosByCliente(id_cliente);
    }
    getEnviosByFechaRange(from: Date, to: Date): Promise<EnvioEntity[]> {
        return this.envioDatasource.getEnviosByFechaRange(from,to);
    }
    getEnviosByClasificacion(clasificacion: ClasificacionEnvio, from?: Date, to?: Date): Promise<EnvioEntity[]> {
        return this.envioDatasource.getEnviosByClasificacion(clasificacion,from,to);
    }
}