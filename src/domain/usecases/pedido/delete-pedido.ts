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
        //verificar si el pedido ya fue eliminado o no existe
        const pedido = await this.pedidoRepository.getPedidoById(id_pedido);
        if (!pedido) {
          throw new Error('El pedido no existe o ya fue eliminado');
        }

        //verificar si el pedido no esta completado
        if (pedido.estado_pedido === 'Completado') {
          throw new Error('No se puede eliminar un pedido completado');
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

        if (pedido.tipo_pedido === 'Orden Tueste') {
          await this.eliminarOrdenTueste(pedido, loteOriginal);
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
        

        // 4. Eliminar Pedido
        await this.pedidoRepository.deletePedido(pedido.id_pedido);
      }
      
      
      private async eliminarTostadoVerde(pedido: PedidoEntity, loteOriginal: LoteEntity) {
        // 1. Restaurar peso al lote original
        const pesoRestaurado = loteOriginal.peso + pedido.cantidad * 1.15;
        const [, dto] = UpdateLoteDto.update({ peso: pesoRestaurado });
        if (!dto) throw new Error('Error generando DTO para restaurar lote original');
        await this.loteRepository.updateLote(loteOriginal.id_lote, dto);
        
        // 4. Eliminar Pedido
        await this.pedidoRepository.deletePedido(pedido.id_pedido);
       
      }
      
      private async eliminarOrdenTueste(pedido: PedidoEntity, loteOriginal: LoteEntity) {
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