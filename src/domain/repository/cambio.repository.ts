import { CreateCambioDto } from "../dtos/cambio/create";
import { CambioEntity } from "../entities/cambio.entity";


export abstract class CambioRepository {

    abstract createCambio(createCambioDto: CreateCambioDto): Promise<CambioEntity>;

    abstract getCambiosByEntidad(entidad: string, id_entidad: string): Promise<CambioEntity[]>;

    abstract getCambiosByUser(id_user: string): Promise<CambioEntity[]>;
}
