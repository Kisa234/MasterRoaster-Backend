import { CreateFichaEnvioDto } from "../dtos/envio/fichaEnvio/create";
import { UpdateFichaEnvioDto } from "../dtos/envio/fichaEnvio/update";
import { FichaEnvioEntity } from "../entities/fichaEnvio.entity";


export interface FichaEnvioDataSource {
  create(dto: CreateFichaEnvioDto): Promise<FichaEnvioEntity>;
  getByEnvio(id_envio: string): Promise<FichaEnvioEntity | null>;
  updateByEnvio(id_envio: string, dto: UpdateFichaEnvioDto): Promise<FichaEnvioEntity>;
  deleteByEnvio(id_envio: string): Promise<void>;

  // (Opcional)
  getById(id_ficha: string): Promise<FichaEnvioEntity | null>;
  deleteById(id_ficha: string): Promise<void>;
}
