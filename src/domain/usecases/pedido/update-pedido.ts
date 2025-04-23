import { UpdatePedidoDto } from "../../dtos/pedido/update";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";
import { UserRepository } from "../../repository/user.repository";
import { CreateTuesteDto } from "../../dtos/tueste/create";
import { UpdateLoteDto } from "../../dtos/lotes/lote/update";

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

  private async actualizarVentaVerde(pedido: any, loteOriginal: any, dto: UpdatePedidoDto): Promise<PedidoEntity> {
    const diferencia = dto.cantidad! - pedido.cantidad;

    if (diferencia > 0 && loteOriginal.peso < diferencia) {
      throw new Error('No hay suficiente cantidad disponible en el lote original');
    }


    // Actualizar peso en lote original
    const nuevoPesoLote = loteOriginal.peso - diferencia;
    const [, updateLoteDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });

    
    await this.loteRepository.updateLote(pedido.id_lote, updateLoteDto!);



    // Actualizar peso en lote clonado
    const user = await this.userRepository.getUserById(pedido.id_user);
    const nombres = user!.nombre.trim().split(' ');
    const iniciales = `${nombres[0]?.charAt(0) ?? ''}${nombres[1]?.charAt(0) ?? ''}-`.toUpperCase();
    const id_lote_clonado = iniciales + pedido.id_lote;
      

    const loteClonado = await this.loteRepository.getLoteById(id_lote_clonado);
    if (loteClonado && !loteClonado.eliminado) {
      const nuevoPesoClonado = loteClonado.peso + diferencia;
      const [, updateClonadoDto] = UpdateLoteDto.update({ peso: nuevoPesoClonado });
      await this.loteRepository.updateLote(id_lote_clonado, updateClonadoDto!);
    }



    // Actualizar pedido
    
    await this.pedidoRepository.updatePedido(pedido.id_pedido, dto!);
    const pedidoActualizado = await this.pedidoRepository.getPedidoById(pedido.id_pedido);
    return PedidoEntity.fromObject(pedidoActualizado!);
  }

  private async actualizarTostadoVerde(pedido: any, loteOriginal: any, dto: UpdatePedidoDto): Promise<PedidoEntity> {
    const pesoAnterior = pedido.cantidad * 1.5;
    const pesoNuevo = dto.cantidad! * 1.5;
    const diferencia = pesoNuevo - pesoAnterior;

    if (diferencia > 0 && loteOriginal.peso < diferencia) {
      throw new Error('No hay suficiente café verde disponible');
    }

    // Actualizar peso en lote original
    const nuevoPesoLote = loteOriginal.peso - diferencia;
    const [, updateLoteDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });
    await this.loteRepository.updateLote(pedido.id_lote, updateLoteDto!);

    // Eliminar tuestes actuales
    const tuestes = await this.tuesteRepository.getTostadosByPedido(pedido.id_pedido);
    for (const t of tuestes) {
      await this.tuesteRepository.deleteTueste(t.id_tueste);
    }

    // Crear nuevos tuestes
    const nuevosTuestes = this.generarPesoTuestes(pesoNuevo);
    const fecha = this.getFechaCercana();
    for (const cant of nuevosTuestes) {
      const [, createDto] = CreateTuesteDto.create({
        fecha_tueste: fecha,
        tostadora: 'Candela',
        peso_entrada: cant,
        id_pedido: pedido.id_pedido,
      });
      await this.tuesteRepository.createTueste(createDto!);
    }

    // Actualizar pedido
  
    await this.pedidoRepository.updatePedido(pedido.id_pedido, dto!);
    const pedidoActualizado = await this.pedidoRepository.getPedidoById(pedido.id_pedido);
    return PedidoEntity.fromObject(pedidoActualizado!);
  }

  private generarPesoTuestes(cantidadRequerida: number): number[] {
    const MIN = 2, MAX = 3.5;
    const tuestes = [];
    let cantidadEntera = Math.floor(cantidadRequerida / MAX);
    let residuo = parseFloat((cantidadRequerida % MAX).toFixed(2));

    if (residuo > 0 && residuo < MIN) {
      if (cantidadEntera === 0) return [];
      const nuevoTamaño = cantidadRequerida / cantidadEntera;
      if (nuevoTamaño >= MIN && nuevoTamaño <= MAX) {
        return Array(cantidadEntera).fill(parseFloat(nuevoTamaño.toFixed(2)));
      }

      cantidadEntera += 1;
      const ajustado = cantidadRequerida / cantidadEntera;
      return ajustado >= MIN && ajustado <= MAX
        ? Array(cantidadEntera).fill(parseFloat(ajustado.toFixed(2)))
        : [];
    }

    for (let i = 0; i < cantidadEntera; i++) tuestes.push(MAX);
    if (residuo >= MIN) tuestes.push(residuo);
    return tuestes;
  }

  private getFechaCercana(): Date {
    const now = new Date();
    const daysToTuesday = (2 - now.getDay() + 7) % 7;
    const daysToThursday = (4 - now.getDay() + 7) % 7;

    const nextTuesday = new Date(now);
    nextTuesday.setDate(now.getDate() + daysToTuesday);

    const nextThursday = new Date(now);
    nextThursday.setDate(now.getDate() + daysToThursday);

    return Math.abs(nextTuesday.getTime() - now.getTime()) <= Math.abs(nextThursday.getTime() - now.getTime())
      ? nextTuesday
      : nextThursday;
  }
}
