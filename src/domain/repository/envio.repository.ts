import { CreateEnvioDto } from "../dtos/envio/create";
import { ProgramarEnvioDto } from "../dtos/envio/programar";
import { DespacharEnvioDto } from "../dtos/envio/despachar";
import { ConfirmarEntregaEnvioDto } from "../dtos/envio/confirmar-entrega";
import { CancelarEnvioDto } from "../dtos/envio/cancelar";
import { RegistrarDevolucionEnvioDto } from "../dtos/envio/registrar-devolucion";
import { EnvioEntity, EnvioConDetalleEntity } from "../entities/envio.entity";

export abstract class EnvioRepository {
    abstract create(dto: CreateEnvioDto, numero_correlativo: string): Promise<EnvioEntity>;
    abstract getById(id_envio: string): Promise<EnvioEntity | null>;
    abstract getByIdConDetalle(id_envio: string): Promise<EnvioConDetalleEntity | null>;
    abstract getAll(estado?: string): Promise<EnvioEntity[]>;
    abstract countTotal(): Promise<number>;

    abstract programar(id_envio: string, dto: ProgramarEnvioDto): Promise<EnvioEntity>;
    abstract despachar(id_envio: string, dto: DespacharEnvioDto): Promise<EnvioEntity>;
    abstract confirmarEntrega(id_envio: string, dto: ConfirmarEntregaEnvioDto): Promise<EnvioEntity>;
    abstract cancelar(id_envio: string, dto: CancelarEnvioDto): Promise<EnvioEntity>;
    abstract registrarDevolucion(id_envio: string, dto: RegistrarDevolucionEnvioDto): Promise<EnvioEntity>;
}
