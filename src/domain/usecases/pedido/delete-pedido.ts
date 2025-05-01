import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
import { LoteEntity } from "../../entities/lote.entity";
import { PedidoEntity } from "../../entities/pedido.entity";
import { TuesteEntity } from "../../entities/tueste.entity";
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
        private readonly userRepository: UserRepository
    ){}

    async execute(id_pedido: string): Promise<void> {
        const pedido = await this.pedidoRepository.getPedidoById(id_pedido);
        if (!pedido) {
          throw new Error('El pedido no existe o ya fue eliminado');
        }
    
        const loteOriginal = await this.loteRepository.getLoteById(pedido.id_lote);
        if (!loteOriginal) throw new Error('Lote original no encontrado');
    
        // Revertir cambios según tipo de pedido
        if (pedido.tipo_pedido === 'Venta Verde') {
          await this.eliminarVentaVerde(pedido, loteOriginal);
        }
    
        if (pedido.tipo_pedido === 'Tostado Verde') {
          await this.eliminarTostadoVerde(pedido, loteOriginal);
        }
    
        // Marcar el pedido como eliminado
        await this.pedidoRepository.deletePedido(id_pedido);
      }
    
      private async eliminarVentaVerde(pedido: PedidoEntity, loteOriginal: LoteEntity) {
        // 1. Restaurar peso al lote original
        const pesoRestaurado = loteOriginal.peso + pedido.cantidad;
        const [, updateDtoOriginal] = UpdateLoteDto.update({ peso: pesoRestaurado });
        if (!updateDtoOriginal) throw new Error('Error generando DTO para lote original');
        await this.loteRepository.updateLote(loteOriginal.id_lote, updateDtoOriginal);
      
        // 2. Eliminar o actualizar el lote clonado
        if (!pedido.id_nuevoLote) return;
      
        const loteClonado = await this.loteRepository.getLoteById(pedido.id_nuevoLote);
        if (!loteClonado || loteClonado.eliminado) return;
      
        // 3. Restar el peso del pedido
        const pesoRestante = loteClonado.peso - pedido.cantidad;
        const [, updateDtoClonado] = UpdateLoteDto.update({ peso: pesoRestante });
        if (!updateDtoClonado) throw new Error('Error generando DTO para lote clonado');
        await this.loteRepository.updateLote(loteClonado.id_lote, updateDtoClonado);
      
        // 4. Si el peso restante es 0, eliminar lote
        if (pesoRestante <= 0) {
          await this.loteRepository.deleteLote(loteClonado.id_lote);
        }
      }
      
    
      private async eliminarTostadoVerde(pedido: PedidoEntity, loteOriginal: LoteEntity) {
        // 1. Restaurar peso al lote original (1.15x la cantidad)
        const pesoRestaurado = loteOriginal.peso + pedido.cantidad * 1.15;
        const [, dto] = UpdateLoteDto.update({ peso: pesoRestaurado });
        if (!dto) throw new Error('Error generando DTO para restaurar lote original');
        await this.loteRepository.updateLote(loteOriginal.id_lote, dto);
      
        // 3. Eliminar lote clonado si existe (id_nuevoLote)
        if (pedido.id_nuevoLote) {
          const loteClonado = await this.loteRepository.getLoteById(pedido.id_nuevoLote);
          if (loteClonado && !loteClonado.eliminado) {
            // Descontar peso
            const pesoRestante = loteClonado.peso - pedido.cantidad;
            const [, updateDtoClonado] = UpdateLoteDto.update({ peso: pesoRestante });
            if (!updateDtoClonado) throw new Error('Error generando DTO para lote clonado');
            await this.loteRepository.updateLote(loteClonado.id_lote, updateDtoClonado);
      
            // Si queda en 0, eliminar
            if (pesoRestante <= 0) {
              await this.loteRepository.deleteLote(loteClonado.id_lote);
            }
          }
        }
      }
      
}