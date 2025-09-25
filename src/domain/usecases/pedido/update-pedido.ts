import { UpdatePedidoDto } from "../../dtos/pedido/update";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";
import { UserRepository } from "../../repository/user.repository";
import { CreateTuesteDto } from "../../dtos/tueste/create";
import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
import { LoteEntity } from "../../entities/lote.entity";
import { AnalisisRepository } from "../../repository/analisis.repository";
import { AnalisisFisicoRepository } from "../../repository/analisisFisico.repository";
import { AnalisisFisicoEntity } from "../../entities/analisisFisico.entity";

export interface UpdatePedidoUseCase {
  execute(id_pedido: string, updateDto: UpdatePedidoDto): Promise<PedidoEntity>;
}

export class UpdatePedido implements UpdatePedidoUseCase {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly loteRepository: LoteRepository,
    private readonly tuesteRepository: TuesteRepository,
    private readonly userRepository: UserRepository,
    private readonly analisisRepository: AnalisisRepository,
    private readonly analisisFisicoRepository: AnalisisFisicoRepository,

  ) { }

  async execute(id_pedido: string, updateDto: UpdatePedidoDto): Promise<PedidoEntity> {
    const pedido = await this.pedidoRepository.getPedidoById(id_pedido);
    if (!pedido || pedido.eliminado) throw new Error('El pedido no existe o fue eliminado');
    if (pedido.estado_pedido === 'Completado') throw new Error('No se puede modificar un pedido completado');
    const loteOriginal = await this.loteRepository.getLoteById(pedido.id_lote);
    if (!loteOriginal) throw new Error('Lote original no encontrado');

    if (pedido.tipo_pedido === 'Venta Verde') {

      return this.actualizarVentaVerde(pedido, loteOriginal, updateDto);
    }

    if (pedido.tipo_pedido === 'Tostado Verde') {

      return this.actualizarTostadoVerde(pedido, loteOriginal, updateDto);
    }

    if (pedido.tipo_pedido === 'Orden Tueste') {
      return this.editarOrdenTueste(pedido, loteOriginal, updateDto);
    }

    throw new Error('Tipo de pedido inválido');
  }

  private async actualizarVentaVerde(pedido: PedidoEntity, loteOriginal: LoteEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {

    const diferencia = pedido.cantidad - dto.cantidad!;
    // Validar si la cantidad ha cambiado
    if (diferencia === 0) throw new Error('La cantidad no ha cambiado');

    //validar que el nuevo peso no sea 0 o negativo
    if (dto.cantidad! <= 0) throw new Error('La cantidad del pedido debe ser mayor a 0');

    // 1. Validar si hay suficiente café en el lote original si la diferencia es positiva (aumento de pedido)
    if ((loteOriginal.peso + pedido.cantidad) < dto.cantidad!) {
      throw new Error('No hay suficiente cantidad disponible en el lote original');
    }

    // 2. Actualizar peso en lote original
    const nuevoPesoLote = loteOriginal.peso + pedido.cantidad - dto.cantidad!;
    const [, updateLoteDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });
    if (!updateLoteDto) throw new Error('Error generando DTO para lote original');
    await this.loteRepository.updateLote(loteOriginal.id_lote, updateLoteDto);



    // 3. Actualizar peso nuevo lote
    const nuevoLote = await this.loteRepository.getLoteById(pedido.id_nuevoLote!);
    if (!nuevoLote || nuevoLote.eliminado) throw new Error('Lote clonado no válido');
    const nuevoPeso = nuevoLote.peso - pedido.cantidad + dto.cantidad!;
    const [, updateNuevoLoteDto] = UpdateLoteDto.update({ peso: nuevoPeso });
    await this.loteRepository.updateLote(nuevoLote.id_lote, updateNuevoLoteDto!);



    // 4. Actualizar pedido
    await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);
    const pedidoActualizado = await this.pedidoRepository.getPedidoById(pedido.id_pedido);
    return PedidoEntity.fromObject(pedidoActualizado!);
  }


  private async actualizarTostadoVerde(pedido: PedidoEntity, loteOriginal: LoteEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {
    const diferencia = pedido.cantidad - dto.cantidad!;
    // Validar si la cantidad ha cambiado
    if (diferencia === 0) throw new Error('La cantidad no ha cambiado');

    //validar que el nuevo peso no sea 0 o negativo
    if (dto.cantidad! <= 0) throw new Error('La cantidad del pedido debe ser mayor a 0');

    // 1. Validar si hay suficiente café en el lote original si la diferencia es positiva (aumento de pedido)
    if ((loteOriginal.peso + pedido.cantidad * 1.15) < dto.cantidad!) {
      throw new Error('No hay suficiente cantidad disponible en el lote original');
    }

    // 2. Actualizar peso en lote original
    const nuevoPesoLote = loteOriginal.peso + pedido.cantidad * 1.15 - dto.cantidad! * 1.15;
    const [, updateLoteDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });
    if (!updateLoteDto) throw new Error('Error generando DTO para lote original');
    await this.loteRepository.updateLote(loteOriginal.id_lote, updateLoteDto);

    // 3. Actualizar peso nuevo lote
    const nuevoLote = await this.loteRepository.getLoteById(pedido.id_nuevoLote!);
    if (!nuevoLote || nuevoLote.eliminado) throw new Error('Lote clonado no válido');
    const nuevoPesoVerde = nuevoLote.peso - pedido.cantidad * 1.15 + dto.cantidad! * 1.15;
    const nuevoPesoTostado = nuevoLote.peso_tostado! - pedido.cantidad + dto.cantidad!;
    const [, updateNuevoLoteDto] = UpdateLoteDto.update({
      peso: nuevoPesoVerde,
      peso_tostado: nuevoPesoTostado
    });
    await this.loteRepository.updateLote(nuevoLote.id_lote, updateNuevoLoteDto!);

    // 4. Actualizar pedido
    await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);
    const pedidoActualizado = await this.pedidoRepository.getPedidoById(pedido.id_pedido);
    return PedidoEntity.fromObject(pedidoActualizado!);
  }

  async editarOrdenTueste(pedido: PedidoEntity, lote: LoteEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {

    const pesoAnterior = pedido.cantidad;
    const pesoNuevo = dto.cantidad!;
    const diferencia = pesoNuevo - pesoAnterior;


    if (diferencia > 0 && lote.peso < diferencia) {
      throw new Error('No hay suficiente café verde disponible en el lote original');
    }


    // 1. Actualizar peso en lote original
    const nuevoPesoLote = lote.peso - diferencia;
    const [, updateLoteDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });
    if (!updateLoteDto) throw new Error('Error generando DTO para lote original');
    await this.loteRepository.updateLote(lote.id_lote, updateLoteDto);


    //2. Actualizar pedido
    const newpedido = await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);

    //3. eliminar tuestes anteriores
    const tuestes = await this.tuesteRepository.getTostadosByPedido(pedido.id_pedido);
    if (!tuestes || tuestes.length === 0) console.log('No se encontraron tuestes para este pedido');
    for (const tueste of tuestes) {
      await this.tuesteRepository.deleteTueste(tueste.id_tueste);
    }
    console.log('Tuestes anteriores eliminados');

    // 4. crear nuevo tueste

    //consegir analisis fisico
    let analisisFisico: AnalisisFisicoEntity | null = null;

    if (!lote.id_analisis) {
      console.warn('El lote no tiene un análisis asociado, usando valores por defecto');
    } else {
      const analisis = await this.analisisRepository.getAnalisisById(lote.id_analisis);
      if (!analisis) {
        console.warn(`No se encontró el análisis ${lote.id_analisis}, usando valores por defecto`);
      } else {
        analisisFisico = await this.analisisFisicoRepository
          .getAnalisisFisicoById(analisis.analisisFisico_id!);
        if (!analisisFisico) {
          console.warn(`No se encontró el análisis físico ${analisis.analisisFisico_id}, usando valores por defecto`);
        }
      }
    }

    //generar tuestes
    if (!dto.pesos) throw new Error('Los pesos son requeridos');
    const density = analisisFisico?.densidad ?? 0;
    const humidity = analisisFisico?.humedad ?? 0;
    let cant = 1;
    for (let peso of dto.pesos) {
      const [, createTuesteDto] = CreateTuesteDto.create({
        id_lote: lote.id_lote,
        num_batch: cant,
        fecha_tueste: dto.fecha_tueste,
        tostadora: dto.tostadora,
        id_cliente: dto.id_user,
        densidad: density,
        humedad: humidity,
        peso_entrada: peso,
        id_pedido: pedido.id_pedido,
      });
      await this.tuesteRepository.createTueste(createTuesteDto!);
      cant++;
    }


    return PedidoEntity.fromObject(newpedido!);
  }

}
