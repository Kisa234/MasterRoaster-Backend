import { PedidoEntity } from '../../entities/pedido.entity';
import { PedidoRepository } from '../../repository/pedido.repository';

export interface GetUltimosPedidosUseCase {
  execute(limite?: number): Promise<PedidoEntity[]>;
}

export class GetUltimosPedidos implements GetUltimosPedidosUseCase {
  constructor(private readonly pedidoRepository: PedidoRepository) { }

  async execute(limite: number = 5): Promise<PedidoEntity[]> {
    const pedidos = await this.pedidoRepository.getHistoricoPedidos();

    return pedidos
      .filter(p => !p.tipo_pedido.includes('Orden Tueste'))
      .sort((a, b) => new Date(b.fecha_registro).getTime() - new Date(a.fecha_registro).getTime())
      .slice(0, limite);
  }
}