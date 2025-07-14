import { PedidoEntity } from "../../entities/pedido.entity";
import { PedidoRepository } from "../../repository/pedido.repository";

export interface TuestePendientesUseCase {
  execute(): Promise<PedidoEntity[]>;
}

export class TuestePendiente implements TuestePendientesUseCase {
  constructor(
    private readonly pedidoRepository: PedidoRepository
  ){}

  async execute(): Promise<PedidoEntity[]> {
    // 1) Obtener todos los pedidos con orden de tueste
    const pedidos = await this.pedidoRepository.getPedidosOrdenTueste();
    if (!pedidos) {
      throw new Error("No se encontraron pedidos de tueste");
    }

    // 2) Filtrar solo aquellos con estado "Pendiente"
    const pendientes = pedidos.filter(
      pedido => pedido.estado_pedido === "Pendiente"
    );

    // 3) Devolver la lista filtrada
    return pendientes;
  }
}
