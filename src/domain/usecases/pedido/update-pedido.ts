import { UpdatePedidoDto } from "../../dtos/pedido/update";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";
import { UserRepository } from "../../repository/user.repository";
import { CreateTuesteDto } from "../../dtos/tueste/create";
import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
import { LoteEntity } from "../../entities/lote.entity";

export interface UpdatePedidoUseCase {
  execute(id_pedido: string, updateDto: UpdatePedidoDto): Promise<PedidoEntity>;
}

export class UpdatePedido implements UpdatePedidoUseCase {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly loteRepository: LoteRepository,
    private readonly tuesteRepository: TuesteRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(id_pedido: string, updateDto: UpdatePedidoDto): Promise<PedidoEntity> {
    const pedido = await this.pedidoRepository.getPedidoById(id_pedido);
    if (!pedido || pedido.eliminado) throw new Error('El pedido no existe o fue eliminado');
    if (pedido.cantidad === updateDto.cantidad) throw new Error('No se han realizado cambios en la cantidad del pedido')
    if (pedido.estado_pedido === 'Completado') throw new Error('No se puede modificar un pedido completado');

    const loteOriginal = await this.loteRepository.getLoteById(pedido.id_lote);
    if (!loteOriginal) throw new Error('Lote original no encontrado');

    
    if (pedido.tipo_pedido === 'Venta Verde') {

      return this.actualizarVentaVerde(pedido, loteOriginal, updateDto);
    }

    if (pedido.tipo_pedido === 'Tostado Verde') {

      return this.actualizarTostadoVerde(pedido, loteOriginal, updateDto);
    }

    throw new Error('Tipo de pedido inválido');
  }

  private async actualizarVentaVerde(pedido: PedidoEntity, loteOriginal: LoteEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {
    const diferencia = dto.cantidad! - pedido.cantidad;
  
    if (diferencia === 0) throw new Error('La cantidad no ha cambiado');
  
    // 1. Validar si hay suficiente café en el lote original si la diferencia es positiva (aumento de pedido)
    if (diferencia > 0 && loteOriginal.peso < diferencia) {
      throw new Error('No hay suficiente cantidad disponible en el lote original');
    }
  
    // 2. Actualizar peso en lote original
    const nuevoPesoLote = loteOriginal.peso - diferencia;
    const [, updateLoteDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });
    if (!updateLoteDto) throw new Error('Error generando DTO para lote original');
    await this.loteRepository.updateLote(loteOriginal.id_lote, updateLoteDto);
  
    // 3. Actualizar o eliminar lote clonado
    if (!pedido.id_nuevoLote) throw new Error('No se encontró lote clonado para este pedido');
  
    const loteClonado = await this.loteRepository.getLoteById(pedido.id_nuevoLote);
    if (!loteClonado || loteClonado.eliminado) throw new Error('Lote clonado no válido');
  
    const nuevoPesoClonado = loteClonado.peso + diferencia;
  
    if (nuevoPesoClonado <= 0) {
      await this.loteRepository.deleteLote(loteClonado.id_lote);
    } else {
      const [, updateDtoClonado] = UpdateLoteDto.update({ peso: nuevoPesoClonado });
      if (!updateDtoClonado) throw new Error('Error generando DTO para lote clonado');
      await this.loteRepository.updateLote(loteClonado.id_lote, updateDtoClonado);
    }
  
    // 4. Actualizar pedido
    await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);
    const pedidoActualizado = await this.pedidoRepository.getPedidoById(pedido.id_pedido);
    return PedidoEntity.fromObject(pedidoActualizado!);
  }
  
  private async actualizarTostadoVerde(pedido: PedidoEntity, loteOriginal: LoteEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {
    const pesoAnterior = pedido.cantidad * 1.15;
    const pesoNuevo = dto.cantidad! * 1.15;
    const diferencia = pesoNuevo - pesoAnterior;
  
    if (diferencia === 0) throw new Error('La cantidad no ha cambiado');
  
    if (diferencia > 0 && loteOriginal.peso < diferencia) {
      throw new Error('No hay suficiente café verde disponible en el lote original');
    }
  
    // 1. Actualizar peso en lote original
    const nuevoPesoLote = loteOriginal.peso - diferencia;
    const [, updateLoteDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });
    if (!updateLoteDto) throw new Error('Error generando DTO para lote original');
    await this.loteRepository.updateLote(loteOriginal.id_lote, updateLoteDto);
  
  
    // 3. Actualizar o eliminar lote clonado
    if (!pedido.id_nuevoLote) throw new Error('No se encontró lote clonado para este pedido');
  
    const loteClonado = await this.loteRepository.getLoteById(pedido.id_nuevoLote);
    if (!loteClonado || loteClonado.eliminado) throw new Error('Lote clonado no válido');
  
    const nuevoPesoClonado = loteClonado.peso + diferencia;
  
    if (nuevoPesoClonado <= 0) {
      await this.loteRepository.deleteLote(loteClonado.id_lote);
    } else {
      const [, updateClonadoDto] = UpdateLoteDto.update({ peso: nuevoPesoClonado });
      if (!updateClonadoDto) throw new Error('Error generando DTO para lote clonado');
      await this.loteRepository.updateLote(loteClonado.id_lote, updateClonadoDto);
    }
  
    // 4. Actualizar pedido
    await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);
    const pedidoActualizado = await this.pedidoRepository.getPedidoById(pedido.id_pedido);
    return PedidoEntity.fromObject(pedidoActualizado!);
  }
  

  
}
