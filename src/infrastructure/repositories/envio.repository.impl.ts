import { EnvioDataSource } from "../../domain/datasources/envio.datasource";
import { CreateEnvioDto } from "../../domain/dtos/envio/create";
import { ProgramarEnvioDto } from "../../domain/dtos/envio/programar";
import { DespacharEnvioDto } from "../../domain/dtos/envio/despachar";
import { ConfirmarEntregaEnvioDto } from "../../domain/dtos/envio/confirmar-entrega";
import { CancelarEnvioDto } from "../../domain/dtos/envio/cancelar";
import { RegistrarDevolucionEnvioDto } from "../../domain/dtos/envio/registrar-devolucion";
import { EnvioEntity, EnvioConDetalleEntity } from "../../domain/entities/envio.entity";
import { EnvioRepository } from "../../domain/repository/envio.repository";

export class EnvioRepositoryImpl implements EnvioRepository {
    constructor(private readonly datasource: EnvioDataSource) { }

    create(dto: CreateEnvioDto, numero_correlativo: string): Promise<EnvioEntity> {
        return this.datasource.create(dto, numero_correlativo);
    }
    getById(id_envio: string): Promise<EnvioEntity | null> {
        return this.datasource.getById(id_envio);
    }
    getByIdConDetalle(id_envio: string): Promise<EnvioConDetalleEntity | null> {
        return this.datasource.getByIdConDetalle(id_envio);
    }
    getAll(estado?: string): Promise<EnvioEntity[]> {
        return this.datasource.getAll(estado);
    }
    countTotal(): Promise<number> {
        return this.datasource.countTotal();
    }
    programar(id_envio: string, dto: ProgramarEnvioDto): Promise<EnvioEntity> {
        return this.datasource.programar(id_envio, dto);
    }
    despachar(id_envio: string, dto: DespacharEnvioDto): Promise<EnvioEntity> {
        return this.datasource.despachar(id_envio, dto);
    }
    confirmarEntrega(id_envio: string, dto: ConfirmarEntregaEnvioDto): Promise<EnvioEntity> {
        return this.datasource.confirmarEntrega(id_envio, dto);
    }
    cancelar(id_envio: string, dto: CancelarEnvioDto): Promise<EnvioEntity> {
        return this.datasource.cancelar(id_envio, dto);
    }
    registrarDevolucion(id_envio: string, dto: RegistrarDevolucionEnvioDto): Promise<EnvioEntity> {
        return this.datasource.registrarDevolucion(id_envio, dto);
    }
}
