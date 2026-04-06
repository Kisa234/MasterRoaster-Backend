import { UpdatePedidoDto } from "../../dtos/pedido/update";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";
import { UserRepository } from "../../repository/user.repository";
import { CreateTuesteDto } from "../../dtos/tueste/create";
import { AnalisisRepository } from "../../repository/analisis.repository";
import { AnalisisFisicoRepository } from "../../repository/analisisFisico.repository";
import { AnalisisFisicoEntity } from "../../entities/analisisFisico.entity";
import { LoteTostadoRepository } from "../../repository/loteTostado.repository";
import { InventarioLoteRepository } from '../../repository/inventario-lote.repository';

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
    private readonly inventarioLoteRepository: InventarioLoteRepository

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
    const idAlmacen = dto.id_almacen ?? pedido.id_almacen;
    if (!idAlmacen) throw new Error('El pedido no tiene almacén');

    const idLote = dto.id_lote ?? pedido.id_lote;
    if (!idLote) throw new Error('El pedido no tiene lote');

    const inventario = await this.inventarioLoteRepository.getByLoteAndAlmacen(idLote, idAlmacen);
    if (!inventario) throw new Error('Inventario del lote no encontrado');

    const nuevaCantidad = dto.cantidad ?? pedido.cantidad;

    if (inventario.cantidad_kg < nuevaCantidad) {
      throw new Error('No hay suficiente cantidad disponible en el lote original');
    }

    const pedidoActualizado = await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);
    return PedidoEntity.fromObject(pedidoActualizado!);
  }

  private async actualizarTostadoVerde(pedido: PedidoEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {
    const idAlmacen = dto.id_almacen ?? pedido.id_almacen;
    if (!idAlmacen) throw new Error('El pedido no tiene almacén');

    const idLote = dto.id_lote ?? pedido.id_lote;
    if (!idLote) throw new Error('El pedido no tiene lote');

    const inventario = await this.inventarioLoteRepository.getByLoteAndAlmacen(idLote, idAlmacen);
    if (!inventario) throw new Error('Inventario del lote no encontrado');

    const nuevaCantidad = dto.cantidad ?? pedido.cantidad;
    const cantidadVerdeNecesaria = Math.ceil(nuevaCantidad * 1.1765);

    if (inventario.cantidad_kg < cantidadVerdeNecesaria) {
      throw new Error('No hay suficiente cantidad verde disponible en el lote original');
    }

    const pedidoActualizado = await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);
    return PedidoEntity.fromObject(pedidoActualizado!);
  }

  async editarOrdenTueste(pedido: PedidoEntity, dto: UpdatePedidoDto): Promise<PedidoEntity> {
    const idLote = dto.id_lote ?? pedido.id_lote;
    if (!idLote) throw new Error('Lote original no encontrado');

    const lote = await this.loteRepository.getLoteById(idLote);
    if (!lote) throw new Error('Lote original no encontrado');

    const idAlmacen = dto.id_almacen ?? pedido.id_almacen;
    if (!idAlmacen) throw new Error('El pedido no tiene almacén');

    const inventario = await this.inventarioLoteRepository.getByLoteAndAlmacen(idLote, idAlmacen);
    if (!inventario) throw new Error('Inventario del lote no encontrado');

    const nuevaCantidad = dto.cantidad ?? pedido.cantidad;

    if (inventario.cantidad_kg < nuevaCantidad) {
      throw new Error('No hay suficiente café verde disponible en el lote original');
    }

    if (lote.tipo_lote === 'Lote Tostado') {
      const tostadoDisponible = inventario.cantidad_tostado_kg ?? 0;
      if (tostadoDisponible < nuevaCantidad) {
        throw new Error('No hay suficiente cantidad tostada disponible en el lote');
      }
    }

    const pedidoActualizado = await this.pedidoRepository.updatePedido(pedido.id_pedido, dto);

    const tuestes = await this.tuesteRepository.getTostadosByPedido(pedido.id_pedido);
    let debeRecrearTuestes = false;

    if (!tuestes || tuestes.length === 0) {
      debeRecrearTuestes = true;
    } else if (!dto.pesos) {
      debeRecrearTuestes = false;
    } else if (tuestes.length !== dto.pesos.length) {
      debeRecrearTuestes = true;
    } else {
      const pesosActuales = tuestes.map(t => t.peso_entrada);
      for (let i = 0; i < pesosActuales.length; i++) {
        if (pesosActuales[i] !== dto.pesos[i]) {
          debeRecrearTuestes = true;
          break;
        }
      }
    }

    if (debeRecrearTuestes) {
      for (const tueste of tuestes ?? []) {
        await this.tuesteRepository.deleteTueste(tueste.id_tueste);
      }

      let analisisFisico: AnalisisFisicoEntity | null = null;

      if (lote.id_analisis) {
        const analisis = await this.analisisRepository.getAnalisisById(lote.id_analisis);
        if (analisis) {
          analisisFisico = await this.analisisFisicoRepository
            .getAnalisisFisicoById(analisis.analisisFisico_id!);
        }
      }

      if (!dto.pesos) throw new Error('Los pesos son requeridos');

      const density = analisisFisico?.densidad ?? 0;
      const humidity = analisisFisico?.humedad ?? 0;

      let cant = 1;
      for (const peso of dto.pesos) {
        const [error, createTuesteDto] = CreateTuesteDto.create({
          id_lote: lote.id_lote,
          num_batch: cant,
          fecha_tueste: dto.fecha_tueste ?? pedido.fecha_tueste,
          tostadora: dto.tostadora ?? pedido.tostadora,
          id_cliente: dto.id_user ?? pedido.id_user,
          densidad: density,
          humedad: humidity,
          peso_entrada: peso,
          id_pedido: pedido.id_pedido,
        });

        if (error || !createTuesteDto) {
          throw new Error(error ?? 'Error al crear DTO de tueste');
        }

        await this.tuesteRepository.createTueste(createTuesteDto);
        cant++;
      }
    }

    return PedidoEntity.fromObject(pedidoActualizado!);
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
