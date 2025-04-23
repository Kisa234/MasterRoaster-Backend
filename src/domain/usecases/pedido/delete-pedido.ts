import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
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
        if (!pedido || pedido.eliminado) {
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
    
      private async eliminarVentaVerde(pedido: any, loteOriginal: any) {
        // 1. Restaurar peso al lote original
        const pesoRestaurado = loteOriginal.peso + pedido.cantidad;
        const [a, updateDtoOriginal] = UpdateLoteDto.update({ peso: pesoRestaurado });
        await this.loteRepository.updateLote(pedido.id_lote, updateDtoOriginal!);
      
        // 2. Obtener el ID del lote clonado
        const user = await this.userRepository.getUserById(pedido.id_user);
        if (!user || user.eliminado) throw new Error('El cliente no existe o está eliminado');
        const nombres = user.nombre.trim().split(' ');
        const iniciales = `${nombres[0]?.charAt(0) ?? ''}${nombres[1]?.charAt(0) ?? ''}-`.toUpperCase();
        const id_lote_clonado = iniciales + pedido.id_lote;
      
        // 3. Buscar lote clonado y decidir si se elimina o se actualiza
        const loteClonado = await this.loteRepository.getLoteById(id_lote_clonado);
        if (loteClonado && !loteClonado.eliminado) {
          const pesoRestante = loteClonado.peso - pedido.cantidad;
      
          if (pesoRestante <= 0) {
            // Si ya no queda peso, eliminar lote clonado
            const [, updateClonadoDto] = UpdateLoteDto.update({ peso: pesoRestante });
            await this.loteRepository.updateLote(id_lote_clonado, updateClonadoDto!);
            await this.loteRepository.deleteLote(id_lote_clonado);
          } else {
            // Si aún queda peso, actualizar el lote clonado
            const [, updateClonadoDto] = UpdateLoteDto.update({ peso: pesoRestante });
            await this.loteRepository.updateLote(id_lote_clonado, updateClonadoDto!);
          }
        }
      }
      
    
      private async eliminarTostadoVerde(pedido: any, loteOriginal: any) {
        // Restaurar el peso consumido (1.5x la cantidad)

        const pesoRestaurado = loteOriginal.peso + pedido.cantidad * 1.5;
        const [a_,dto] = UpdateLoteDto.update({ peso: pesoRestaurado });
        await this.loteRepository.updateLote(pedido.id_lote, dto!);
    
        //Obtener tuestes relacionados al pedido
        const tuestes = await this.tuesteRepository.getTostadosByPedido(pedido.id_pedido);
        if (!tuestes || tuestes.length === 0) throw new Error('No se encontraron tuestes relacionados al pedido');


        //Eliminar tuestes relacionados al pedido
        for (const tueste of tuestes) {
            const tuesteEntity = TuesteEntity.fromObject(tueste);
            await this.tuesteRepository.deleteTueste(tuesteEntity.id_tueste);
        }
        

        //Eliminar pedido
        await this.pedidoRepository.deletePedido(pedido.id_pedido);
      }
}