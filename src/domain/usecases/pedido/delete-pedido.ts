import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";
import { UserRepository } from "../../repository/user.repository";

export interface DeletePedidoUseCase {
  execute(id_pedido: string): Promise<void>;
}

export class DeletePedido implements DeletePedidoUseCase {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly loteRepository: LoteRepository,
    private readonly tuesteRepository: TuesteRepository,
  ) { }

  async execute(id_pedido: string): Promise<void> {
    //verificar si el pedido ya fue eliminado o no existe
    const pedido = await this.pedidoRepository.getPedidoById(id_pedido);
    if (!pedido) {
      throw new Error('El pedido no existe o ya fue eliminado');
    }

    //verificar si el pedido no esta completado
    if (pedido.estado_pedido === 'Completado') {
      throw new Error('No se puede eliminar un pedido completado');
    }
    // Si el pedido es de tipo "Orden Tueste", eliminar los tuestes asociados primero 
    if (pedido.tipo_pedido === 'Orden Tueste') {
      await this.eliminarOrdenTueste(pedido);
    }else{
      await this.pedidoRepository.deletePedido(id_pedido);
    }
  }

  private async eliminarOrdenTueste(pedido: PedidoEntity) {

    const loteOriginal = await this.loteRepository.getLoteById(pedido.id_lote!);
    if (!loteOriginal) throw new Error('Lote original no encontrado');

    //1. Restaurar peso al lote original si es lote verde
    if (loteOriginal.tipo_lote === 'Lote Verde') {
      const pesoRestaurado = loteOriginal.peso + pedido.cantidad;
      const [, updateDtoOriginal] = UpdateLoteDto.update({ peso: pesoRestaurado });
      if (!updateDtoOriginal) throw new Error('Error generando DTO para lote original');
      await this.loteRepository.updateLote(loteOriginal.id_lote, updateDtoOriginal);
    }

    // 2. Eliminar Tuestes asociados al pedido
    const tuestes = await this.tuesteRepository.getTostadosByPedido(pedido.id_pedido);
    if (!tuestes || tuestes.length === 0) throw new Error('No se encontraron tuestes para este pedido');
    for (const tueste of tuestes) {
      await this.tuesteRepository.deleteTueste(tueste.id_tueste);
    }

    // 3. Eliminar Pedido 
    await this.pedidoRepository.deletePedido(pedido.id_pedido);

  }


}