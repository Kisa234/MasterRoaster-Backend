import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";

export interface DeletePedidoUseCase {
  execute(id_pedido: string): Promise<void>;
}

export class DeletePedido implements DeletePedidoUseCase {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly loteRepository: LoteRepository,
    private readonly tuesteRepository: TuesteRepository,
  ) {}

  async execute(id_pedido: string): Promise<void> {
    const pedido = await this.pedidoRepository.getPedidoById(id_pedido);
    if (!pedido) {
      throw new Error("El pedido no existe o ya fue eliminado");
    }

    if (pedido.estado_pedido === "Completado") {
      throw new Error("No se puede eliminar un pedido completado");
    }

    if (pedido.tipo_pedido === "Orden Tueste") {
      await this.eliminarOrdenTueste(pedido);
      return;
    }

    await this.pedidoRepository.deletePedido(id_pedido);
  }

  private async eliminarOrdenTueste(pedido: PedidoEntity): Promise<void> {
    if (!pedido.id_lote) {
      throw new Error("El pedido no tiene lote asociado");
    }

    const loteOriginal = await this.loteRepository.getLoteById(pedido.id_lote);
    if (!loteOriginal) {
      throw new Error("Lote original no encontrado");
    }

    const tuestes = await this.tuesteRepository.getTostadosByPedido(pedido.id_pedido);

    for (const tueste of tuestes) {
      if (tueste.estado_tueste === "Completado") {
        throw new Error("No se puede eliminar la orden porque tiene tuestes completados");
      }

      await this.tuesteRepository.deleteTueste(tueste.id_tueste);
    }

    await this.pedidoRepository.deletePedido(pedido.id_pedido);
  }
}