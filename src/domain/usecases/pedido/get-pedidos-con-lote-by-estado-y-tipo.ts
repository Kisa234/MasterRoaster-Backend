import { PedidoConLoteEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface GetPedidosConLoteByEstadoYTipoUseCase {
  execute(estado: string, tipo: string): Promise<PedidoConLoteEntity[]>;
}

export class GetPedidosConLoteByEstadoYTipo implements GetPedidosConLoteByEstadoYTipoUseCase {

  constructor(
    private readonly pedidoRepository: PedidoRepository
  ) { }

  async execute(estado: string, tipo: string): Promise<PedidoConLoteEntity[]> {
    return this.pedidoRepository.getPedidosConLoteByEstadoYTipo(estado, tipo);
  }

}