import { EnvioRepository } from "../../repository/envio.repository";
import { EnvioConDetalleEntity } from "../../entities/envio.entity";

export interface GetEnviosPorClienteUseCase {
  execute(id_cliente: string): Promise<EnvioConDetalleEntity[]>;
}

export class GetEnviosPorCliente implements GetEnviosPorClienteUseCase {
  constructor(private readonly envioRepo: EnvioRepository) {}

  execute(id_cliente: string): Promise<EnvioConDetalleEntity[]> {
    return this.envioRepo.getByCliente(id_cliente);
  }
}