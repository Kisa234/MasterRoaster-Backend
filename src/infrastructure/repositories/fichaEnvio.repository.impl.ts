import { FichaEnvioDataSource } from "../../domain/datasources/fichaEnvio.datasource";
import { CreateFichaEnvioDto } from "../../domain/dtos/envio/fichaEnvio/create";
import { UpdateFichaEnvioDto } from "../../domain/dtos/envio/fichaEnvio/update";
import { FichaEnvioEntity } from "../../domain/entities/fichaEnvio.entity";
import { FichaEnvioRepository } from "../../domain/repository/fichaEnvio.repository";


export class FichaEnvioRepositoryImpl implements FichaEnvioRepository {

    constructor(private readonly dataSource: FichaEnvioDataSource) { }

    create(dto: CreateFichaEnvioDto): Promise<FichaEnvioEntity> {
        return this.dataSource.create(dto);
    }
    getByEnvio(id_envio: string): Promise<FichaEnvioEntity | null> {
        return this.dataSource.getByEnvio(id_envio);
    }
    updateByEnvio(id_envio: string, dto: UpdateFichaEnvioDto): Promise<FichaEnvioEntity> {
        return this.dataSource.updateByEnvio(id_envio, dto);
    }
    deleteByEnvio(id_envio: string): Promise<void> {
        return this.dataSource.deleteByEnvio(id_envio);
    }
    getById(id_ficha: string): Promise<FichaEnvioEntity | null> {
        return this.dataSource.getById(id_ficha);
    }
    deleteById(id_ficha: string): Promise<void> {
        return this.dataSource.deleteById(id_ficha);
    }

}
