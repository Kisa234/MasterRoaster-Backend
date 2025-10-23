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
import { LoteTostadoRepository } from "../../repository/loteTostado.repository";

export interface UpdatePedidoUseCase {
  execute(id_pedido: string, updateDto: UpdatePedidoDto): Promise<PedidoEntity>;
}

export class UpdatePedido implements UpdatePedidoUseCase {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly loteRepository: LoteRepository,
    private readonly loteTostadoRepository: LoteTostadoRepository,
    private readonly tuesteRepository: TuesteRepository,
    private readonly userRepository: UserRepository,
    private readonly analisisRepository: AnalisisRepository,
    private readonly analisisFisicoRepository: AnalisisFisicoRepository,

  ) { }

  async execute(id_pedido: string, updateDto: UpdatePedidoDto): Promise<PedidoEntity> {
    const pedido = await this.pedidoRepository.getPedidoById(id_pedido);
    if (!pedido || pedido.eliminado) throw new Error('El pedido no existe o fue eliminado');
    if (pedido.estado_pedido === 'Completado') throw new Error('No se puede modificar un pedido completado');


    if (pedido.tipo_pedido === 'Venta Verde') {

      return this.actualizarVentaVerde(pedido, updateDto);
    }

    if (pedido.tipo_pedido === 'Tostado Verde') {

      return this.actualizarTostadoVerde(pedido, updateDto);
    }

    if (pedido.tipo_pedido === 'Orden Tueste') {
      return this.editarOrdenTueste(pedido, updateDto);
    }

    if (pedido.tipo_pedido === 'Maquila') {
      return this.editarMaquila(pedido, updateDto);
    }

    throw new Error('Tipo de pedido inválido');
  }

  private async actualizarVentaVerde(pedido: PedidoEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {

    const loteOriginal = await this.loteRepository.getLoteById(pedido.id_lote!);
    if (!loteOriginal) throw new Error('Lote original no encontrado');

    // 1. Validar si hay suficiente café en el lote original si la diferencia es positiva (aumento de pedido)
    if (loteOriginal.peso < dto.cantidad!) {
      throw new Error('No hay suficiente cantidad disponible en el lote original');
    };

    // 2. Actualizar pedido
    await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);
    const pedidoActualizado = await this.pedidoRepository.getPedidoById(pedido.id_pedido);
    return PedidoEntity.fromObject(pedidoActualizado!);
  }

  private async actualizarTostadoVerde(pedido: PedidoEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {

    const loteOriginal = await this.loteRepository.getLoteById(pedido.id_lote!);
    if (!loteOriginal) throw new Error('Lote original no encontrado');

    // 1. Validar si hay suficiente café en el lote original si la diferencia es positiva (aumento de pedido)
    if (loteOriginal.peso < (dto.cantidad!  * 1.15)) {
      throw new Error('No hay suficiente cantidad disponible en el lote original');
    }

    // 2. Actualizar pedido
    await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);
    const pedidoActualizado = await this.pedidoRepository.getPedidoById(pedido.id_pedido);
    return PedidoEntity.fromObject(pedidoActualizado!);
  }

  async editarOrdenTueste(pedido: PedidoEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {

    const lote = await this.loteRepository.getLoteById(pedido.id_lote!);
    if (!lote) throw new Error('Lote original no encontrado');

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

  async editarMaquila(pedido: PedidoEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {
    // 1) Validar lote tostado de origen
    if (!pedido.id_lote_tostado) {
      throw new Error('El pedido de maquila no tiene lote tostado de origen');
    }

    const loteTostado = await this.loteTostadoRepository.getLoteTostadoById(pedido.id_lote_tostado);
    if (!loteTostado) throw new Error('Lote tostado no válido o eliminado');

    // 2) Determinar valores "finales" (si no vienen en el DTO, se usan los actuales)
    const nuevaCantidad = dto.cantidad ?? pedido.cantidad;
    const nuevoGramaje = dto.gramaje ?? pedido.gramaje;

    // 3) Validaciones de dominio
    if (nuevaCantidad <= 0) throw new Error('La cantidad de bolsas debe ser mayor a 0');
    if (!nuevoGramaje || nuevoGramaje <= 0) throw new Error('El gramaje debe ser mayor a 0');

    // 4) Calcular peso total solicitado en kg
    const totalSolicitadoKg = (nuevaCantidad * nuevoGramaje); // gramaje viene en gramos

    if (loteTostado.peso < totalSolicitadoKg) {
      throw new Error(`Stock insuficiente. Solo hay ${loteTostado.peso} kg disponibles`);
    }

    // 5) Actualizar pedido (DTO ya limpio y sin undefined)
    const pedidoActualizado = await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);

    return PedidoEntity.fromObject(pedidoActualizado!);
  }



}
