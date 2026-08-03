import { DireccionEnvioDataSource } from "../../domain/datasources/direccion-envio.datasource";
import { CreateDireccionEnvioDto } from "../../domain/dtos/direccion-envio/create";
import { DireccionEnvioEntity } from "../../domain/entities/direccion-envio.entity";
import { DireccionEnvioRepository } from "../../domain/repository/direccion-envio.repository";

export class DireccionEnvioRepositoryImpl implements DireccionEnvioRepository {
    constructor(private readonly datasource: DireccionEnvioDataSource) { }

    create(dto: CreateDireccionEnvioDto): Promise<DireccionEnvioEntity> {
        return this.datasource.create(dto);
    }
    getByEnvio(id_envio: string): Promise<DireccionEnvioEntity | null> {
        return this.datasource.getByEnvio(id_envio);
    }
}
