import { CreateDireccionEnvioDto } from "../dtos/direccion-envio/create";
import { DireccionEnvioEntity } from "../entities/direccion-envio.entity";

export abstract class DireccionEnvioRepository {
    abstract create(dto: CreateDireccionEnvioDto): Promise<DireccionEnvioEntity>;
    abstract getByEnvio(id_envio: string): Promise<DireccionEnvioEntity | null>;
}
