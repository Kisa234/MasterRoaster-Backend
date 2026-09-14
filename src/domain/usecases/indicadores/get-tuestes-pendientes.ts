import { PedidoEntity } from '../../entities/pedido.entity';
import { PedidoRepository } from '../../repository/pedido.repository';

export interface GetTuestesPendientesUseCase {
  execute(): Promise<PedidoEntity[]>;
}

export class GetTuestesPendientes implements GetTuestesPendientesUseCase {
  constructor(private readonly pedidoRepository: PedidoRepository) { }

  async execute(): Promise<PedidoEntity[]> {
    const pedidos = await this.pedidoRepository.getAllPedidos();
    return pedidos.filter(p => p.estado_pedido !== 'Completado' && !p.eliminado);
  }
}