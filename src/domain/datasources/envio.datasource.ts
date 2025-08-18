import { CreateEnvioDto } from '../dtos/envio/create';
import { UpdateEnvioDto } from '../dtos/envio/update';
import { EnvioEntity, ClasificacionEnvio } from '../entities/envio.entity';



export abstract class EnvioDataSource {
  abstract createEnvio(dto: CreateEnvioDto): Promise<EnvioEntity>;
  abstract getEnvioById(id_envio: string): Promise<EnvioEntity | null>;
  abstract updateEnvio(id_envio: string, dto: UpdateEnvioDto): Promise<EnvioEntity>;
  abstract deleteEnvio(id_envio: string): Promise<EnvioEntity>;

  abstract getEnviosByLote(id_lote_tostado: string): Promise<EnvioEntity[]>;
  abstract getEnviosByCliente(id_cliente: string): Promise<EnvioEntity[]>;
  abstract getEnviosByFechaRange(from: Date, to: Date): Promise<EnvioEntity[]>;
  abstract getEnviosByClasificacion(clasificacion: ClasificacionEnvio, from?: Date, to?: Date): Promise<EnvioEntity[]>;

}
