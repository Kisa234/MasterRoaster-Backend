import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { DuplicateLoteUseCase } from './../lote/lote/duplicar-lote';
import { UpdatePedidoDto } from '../../dtos/pedido/update';
import { InventarioProductoRepository } from "../../repository/inventario-producto.repository";
import { LoteTostadoRepository } from "../../repository/loteTostado.repository";
import { InventarioLoteRepository } from "../../repository/inventario-lote.repository";
import { InventarioLoteTostadoRepository } from "../../repository/inventario-lote-tostado.repository";
import { UpdateInventarioLoteDto } from "../../dtos/inventarios/inventario-lote/update";
import { UpdateInventarioLoteTostadoDto } from "../../dtos/inventarios/inventario-lote-tostado/update";
import { HistorialRepository } from "../../repository/historial.repository";
import { MovimientoAlmacenRepository } from "../../repository/movimiento-almacen.repository";
import { TipoMovimiento } from "../../../enums/tipo-movimiento.enum";
import { EntidadInventario } from "../../../enums/entidad-inventario.enum";
import { CreateMovimientoAlmacenDto } from "../../dtos/almacen/movimiento-almacen/create";
import { HistorialEntidad } from "../../../enums/historial-entidad.enum";
import { HistorialAccion } from "../../../enums/historial-accion.enum";
import { CreateHistorialDto } from "../../dtos/historial/create";
import { TuesteRepository } from '../../repository/tueste.repository';
import { CreateLoteTostadoDto } from "../../dtos/lotes/lote-tostado/create";
import { UpdateTuesteDto } from "../../dtos/tueste/update";

export interface CompletarPedidoUseCase {
    execute(id_pedido: string, id_completado_por: string): Promise<PedidoEntity>;
}

export class CompletarPedido implements CompletarPedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly loteTostadoRepository: LoteTostadoRepository,
        private readonly inventarioLoteRepository: InventarioLoteRepository,
        private readonly inventarioLoteTostadoRepository: InventarioLoteTostadoRepository,
        private readonly duplicateLoteUseCase: DuplicateLoteUseCase,
        private readonly inventarioRepository: InventarioProductoRepository,
        private readonly historialRepository: HistorialRepository,
        private readonly movimientoAlmacenRepository: MovimientoAlmacenRepository,
        private readonly tuesteRepository: TuesteRepository
    ) { }

    async execute(id_pedido: string, id_completado_por: string): Promise<PedidoEntity> {
        const pedido = await this.pedidoRepository.getPedidoById(id_pedido);
        if (!pedido || pedido.eliminado) {
            throw new Error('El pedido no existe o fue eliminado');
        }

        // Validar que no esté ya completado
        if (pedido.estado_pedido === 'Completado') {
            return PedidoEntity.fromObject(pedido);
        }

        // Acciones según tipo de pedido
        switch (pedido.tipo_pedido) {
            case 'Venta Verde':
                return this.ventaVerdeCompletion(pedido.id_pedido, id_completado_por);
                break;
            case 'Tostado Verde':
                return this.tostadoVerdeCompletion(pedido.id_pedido, id_completado_por);
                break;
            case 'Orden Tueste':
                return this.ordenTuesteCompletion(pedido.id_pedido, id_completado_por);
                break
            case 'Maquila':
                return this.maquilaCompletion(pedido.id_pedido, id_completado_por);
                break
            case 'Suscripcion':
                return this.pedidoRepository.completarPedido(id_pedido, id_completado_por);
                break;
            default:
                throw new Error('Tipo de pedido inválido');
        }

    }


    async ventaVerdeCompletion(pedidoId: string, id_completado_por: string) {
        const pedido = await this.pedidoRepository.getPedidoById(pedidoId);
        if (!pedido || pedido.estado_pedido !== "Pendiente") throw new Error("Pedido no válido");

        const loteOrigen = await this.loteRepository.getLoteById(pedido.id_lote!);
        if (!loteOrigen) throw new Error("Lote origen no válido");


        // verificar que el lote tenga suficiente peso para la cantidad solicitada en su almacen correspondiente
        const inventarioLote = await this.inventarioLoteRepository.getByLoteAndAlmacen(loteOrigen.id_lote, pedido.id_almacen!);
        if (!inventarioLote || inventarioLote.cantidad_kg < pedido.cantidad) {
            throw new Error("Stock insuficiente en el almacén");
        }


        // crear lote destino o actualizar existente
        // Verificar si el cliente ya tiene un lote nuevo creado desde este mismo lote original y del mismo tipo de pedido
        const hasLote = await this.verifyIfUserHasLote(pedido.id_user, loteOrigen.id_lote, 'Lote Verde');
        console.log(hasLote);
        if (!hasLote) {
            // crear nuevo lote
            const nuevoLoteDestino = await this.duplicateLoteUseCase.execute(loteOrigen, pedido, false);
            // historial de creacion de lote
            await this.registrarHistorial({
                entidad: HistorialEntidad.LOTE,
                accion: HistorialAccion.CREATE,
                id_entidad: nuevoLoteDestino.id_lote,
                id_user: id_completado_por,
                id_pedido: pedido.id_pedido,
            });
            // crear un inventario para el nuevo lote 
            const nuevoInventarioLote = await this.inventarioLoteRepository.createInventario({
                id_lote: nuevoLoteDestino.id_lote!,
                id_almacen: pedido.id_almacen!,
                cantidad_kg: pedido.cantidad,
            });
            //crear movimiento almacen, derivacion ya que el lote se parte 
            await this.registrarMovimiento({
                tipo: TipoMovimiento.DERIVACION,
                entidad: EntidadInventario.LOTE,
                id_entidad_primario: pedido.id_lote!,
                id_entidad_secundario: nuevoLoteDestino.id_lote,
                id_almacen_origen: pedido.id_almacen,
                id_almacen_destino: pedido.id_almacen,
                cantidad: pedido.cantidad,
                id_user: id_completado_por,
                id_pedido: pedido.id_pedido,
                comentario: `Derivación por Lote Verde en pedido`,

            });

            // actualizar pedido
            const [error, updatePedidoDto] = UpdatePedidoDto.update({
                id_nuevoLote: nuevoLoteDestino.id_lote,
            });
            if (error) {
                throw new Error(error);
            }

            await this.pedidoRepository.updatePedido(pedidoId, updatePedidoDto!);


        } else {
            // actualizar lote existente
            // actualizar stock del lote existente en su inventario correspondiente
            const inventarioLoteExistente = await this.inventarioLoteRepository.getByLoteAndAlmacen(hasLote, pedido.id_almacen!);
            if (!inventarioLoteExistente) throw new Error("Inventario del lote existente no encontrado");
            const nuevoPesoInventario = inventarioLoteExistente.cantidad_kg + pedido.cantidad;
            const [error, updateInventarioLoteExistenteDto] = UpdateInventarioLoteDto.update({ cantidad_kg: nuevoPesoInventario });
            if (error) {
                throw new Error(error);
            }
            await this.inventarioLoteRepository.updateInventario(inventarioLoteExistente.id_inventario, updateInventarioLoteExistenteDto!);
            //crear movimiento almacen, derivacion ya que el lote se parte 
            await this.registrarMovimiento({
                tipo: TipoMovimiento.DERIVACION,
                entidad: EntidadInventario.LOTE,
                id_entidad_primario: pedido.id_lote!,
                id_entidad_secundario: hasLote,
                id_almacen_origen: pedido.id_almacen,
                id_almacen_destino: pedido.id_almacen,
                cantidad: pedido.cantidad,
                id_user: id_completado_por,
                id_pedido: pedido.id_pedido,
            });
            // en caso el lote existente este como eliminado, reactivarlo
            const loteExistente = await this.loteRepository.getLoteById(hasLote);
            if (!loteExistente) throw new Error("Lote existente no encontrado");
            if (loteExistente.eliminado) {

                const [error, updateLoteDto] = UpdateLoteDto.update({ eliminado: false });
                if (error) throw new Error(`Error al actualizar lote: ${error}`);
                await this.loteRepository.updateLote(loteExistente.id_lote, updateLoteDto!);

                await this.registrarHistorial({
                    entidad: HistorialEntidad.LOTE,
                    accion: HistorialAccion.UPDATE,
                    id_entidad: loteExistente.id_lote,
                    id_user: id_completado_por,
                    id_pedido: pedido.id_pedido,
                    comentario: `Reactivación de lote por pedido`,
                });
            }


        }

        // restar stock en lote origen
        const nuevoPesoLote = inventarioLote.cantidad_kg - pedido.cantidad;
        const [error, updateInventarioLoteDto] = UpdateInventarioLoteDto.update({ cantidad_kg: nuevoPesoLote });
        if (error) {
            throw new Error(error);
        }
        await this.inventarioLoteRepository.updateInventario(inventarioLote.id_inventario, updateInventarioLoteDto!);
        //eliminar lote si el nuevo peso es  0 
        if (nuevoPesoLote == 0) {
            // se elimina el lote pero no el inventario
            await this.loteRepository.deleteLote(loteOrigen.id_lote);

            await this.registrarHistorial({
                entidad: HistorialEntidad.LOTE,
                id_entidad: pedido.id_lote!,
                id_user: id_completado_por,
                accion: HistorialAccion.DELETE,
                comentario: `Lote eliminado por consumo total en pedido`,
                id_pedido: pedido.id_pedido
            })
        }
        // marcar pedido como completado
        return this.pedidoRepository.completarPedido(pedidoId, id_completado_por);
    }

    async tostadoVerdeCompletion(pedidoId: string, id_completado_por: string) {
        const pedido = await this.pedidoRepository.getPedidoById(pedidoId);
        if (!pedido || pedido.estado_pedido !== "Pendiente") {
            throw new Error("Pedido no válido");
        }

        const loteOrigen = await this.loteRepository.getLoteById(pedido.id_lote!);
        if (!loteOrigen) {
            throw new Error("Lote origen no válido");
        }

        // validar stock de verde requerido
        const cantidadVerde = pedido.cantidad * 1.1765;
        const inventarioLote = await this.inventarioLoteRepository.getByLoteAndAlmacen(
            loteOrigen.id_lote,
            pedido.id_almacen!
        );

        if (!inventarioLote || inventarioLote.cantidad_kg < cantidadVerde) {
            throw new Error("Stock insuficiente en el almacén");
        }

        // buscar si ya existe lote destino para el cliente
        const hasLote = await this.verifyIfUserHasLote(
            pedido.id_user,
            loteOrigen.id_lote,
            'Lote Tostado'
        );

        if (!hasLote) {
            // crear nuevo lote destino
            const nuevoLoteDestino = await this.duplicateLoteUseCase.execute(
                loteOrigen,
                pedido,
                true
            );

            await this.registrarHistorial({
                entidad: HistorialEntidad.LOTE,
                accion: HistorialAccion.CREATE,
                id_entidad: nuevoLoteDestino.id_lote,
                id_user: id_completado_por,
                id_pedido: pedido.id_pedido,
            });

            await this.inventarioLoteRepository.createInventario({
                id_lote: nuevoLoteDestino.id_lote!,
                id_almacen: pedido.id_almacen!,
                cantidad_kg: cantidadVerde,
                cantidad_tostado_kg: pedido.cantidad
            });

            await this.registrarMovimiento({
                tipo: TipoMovimiento.DERIVACION,
                entidad: EntidadInventario.LOTE,
                id_entidad_primario: pedido.id_lote!,
                id_entidad_secundario: nuevoLoteDestino.id_lote,
                id_almacen_origen: pedido.id_almacen,
                id_almacen_destino: pedido.id_almacen,
                cantidad: pedido.cantidad,
                id_user: id_completado_por,
                id_pedido: pedido.id_pedido,
                comentario: `Derivación por lote tostado en pedido`,
            });

            const [error, updatePedidoDto] = UpdatePedidoDto.update({
                id_nuevoLote: nuevoLoteDestino.id_lote,
            });
            if (error) {
                throw new Error(error);
            }

            await this.pedidoRepository.updatePedido(pedidoId, updatePedidoDto!);

        } else {
            // actualizar lote destino existente
            const inventarioLoteExistente = await this.inventarioLoteRepository.getByLoteAndAlmacen(
                hasLote,
                pedido.id_almacen!
            );
            if (!inventarioLoteExistente) {
                throw new Error("Inventario del lote existente no encontrado");
            }

            const nuevoPesoInventario = inventarioLoteExistente.cantidad_kg + cantidadVerde;
            const nuevoTostado = (inventarioLoteExistente.cantidad_tostado_kg ?? 0) + pedido.cantidad;
            const [error, updateInventarioLoteExistenteDto] = UpdateInventarioLoteDto.update({
                cantidad_kg: nuevoPesoInventario,
                cantidad_tostado_kg: nuevoTostado
            });
            if (error) {
                throw new Error(error);
            }

            await this.inventarioLoteRepository.updateInventario(
                inventarioLoteExistente.id_inventario,
                updateInventarioLoteExistenteDto!
            );

            await this.registrarMovimiento({
                tipo: TipoMovimiento.DERIVACION,
                entidad: EntidadInventario.LOTE,
                id_entidad_primario: pedido.id_lote!,
                id_entidad_secundario: hasLote,
                id_almacen_origen: pedido.id_almacen,
                id_almacen_destino: pedido.id_almacen,
                cantidad: pedido.cantidad,
                id_user: id_completado_por,
                id_pedido: pedido.id_pedido,
                comentario: `Derivación por tostado verde en pedido`,
            });

            const loteExistente = await this.loteRepository.getLoteById(hasLote);
            if (!loteExistente) {
                throw new Error("Lote existente no encontrado");
            }

            if (loteExistente.eliminado) {
                const [error, updateLoteDto] = UpdateLoteDto.update({ eliminado: false });
                if (error) {
                    throw new Error(`Error al actualizar lote: ${error}`);
                }

                await this.loteRepository.updateLote(loteExistente.id_lote, updateLoteDto!);

                await this.registrarHistorial({
                    entidad: HistorialEntidad.LOTE,
                    accion: HistorialAccion.UPDATE,
                    id_entidad: loteExistente.id_lote,
                    id_user: id_completado_por,
                    id_pedido: pedido.id_pedido,
                    comentario: `Reactivación de lote por pedido`,
                    objeto_antes: { eliminado: true },
                    objeto_despues: { eliminado: false },
                });
            }
        }

        // descontar verde del lote origen
        const nuevoPesoLote = inventarioLote.cantidad_kg - cantidadVerde;
        const [error, updateInventarioLoteDto] = UpdateInventarioLoteDto.update({
            cantidad_kg: nuevoPesoLote
        });
        if (error) {
            throw new Error(error);
        }

        await this.inventarioLoteRepository.updateInventario(
            inventarioLote.id_inventario,
            updateInventarioLoteDto!
        );

        if (nuevoPesoLote === 0) {
            await this.loteRepository.deleteLote(loteOrigen.id_lote);

            await this.registrarHistorial({
                entidad: HistorialEntidad.LOTE,
                id_entidad: pedido.id_lote!,
                id_user: id_completado_por,
                accion: HistorialAccion.DELETE,
                comentario: `Lote eliminado por consumo total en pedido`,
                id_pedido: pedido.id_pedido,
            });
        }

        return this.pedidoRepository.completarPedido(pedidoId, id_completado_por);
    }

    async ordenTuesteCompletion(pedidoId: string, id_completado_por: string) {
        const pedido = await this.pedidoRepository.getPedidoById(pedidoId);
        if (!pedido || pedido.estado_pedido !== "Pendiente") {
            throw new Error("Pedido no válido");
        }

        if (!pedido.id_lote) {
            throw new Error("El pedido no tiene lote origen");
        }

        if (!pedido.id_almacen) {
            throw new Error("El pedido no tiene almacén");
        }

        const tuestesDelPedido = await this.tuesteRepository.getTostadosByPedido(pedido.id_pedido);
        if (!tuestesDelPedido.length) {
            throw new Error("El pedido no tiene tuestes asociados");
        }

        const todosCompletados = tuestesDelPedido.every(t => t.estado_tueste === "Completado");
        if (!todosCompletados) {
            throw new Error("Aún existen tuestes pendientes");
        }

        const loteOrigen = await this.loteRepository.getLoteById(pedido.id_lote);
        if (!loteOrigen) {
            throw new Error("Lote origen no encontrado");
        }

        const inventarioLote = await this.inventarioLoteRepository.getByLoteAndAlmacen(
            loteOrigen.id_lote,
            pedido.id_almacen
        );
        if (!inventarioLote) {
            throw new Error("Inventario de lote no encontrado");
        }

        const pesoTotalTostado = tuestesDelPedido.reduce(
            (total, t) => total + (t.peso_salida ?? 0),
            0
        );

        const nuevoPesoLote = inventarioLote.cantidad_kg - pedido.cantidad;

        if (nuevoPesoLote < 0) {
            throw new Error("Inconsistencia: el peso verde quedó negativo al completar la orden de tueste");
        }

        const inventarioPayload: {
            cantidad_kg: number;
            cantidad_tostado_kg?: number;
        } = {
            cantidad_kg: nuevoPesoLote
        };

        if (loteOrigen.tipo_lote === 'Lote Tostado') {
            const tostadoActual = inventarioLote.cantidad_tostado_kg ?? 0;
            const nuevoPesoLoteTostado = tostadoActual - pesoTotalTostado;

            if (nuevoPesoLoteTostado < 0) {
                throw new Error("Inconsistencia: el peso tostado quedó negativo al completar la orden de tueste");
            }

            inventarioPayload.cantidad_tostado_kg = nuevoPesoLoteTostado;
        }

        const [invError, updateInventarioLoteDto] = UpdateInventarioLoteDto.update(inventarioPayload);
        if (invError || !updateInventarioLoteDto) {
            throw new Error(invError ?? "Error al generar DTO de inventario lote");
        }

        await this.inventarioLoteRepository.updateInventario(
            inventarioLote.id_inventario,
            updateInventarioLoteDto
        );

        await this.registrarMovimiento({
            tipo: TipoMovimiento.SALIDA,
            entidad: EntidadInventario.LOTE,
            id_entidad_primario: loteOrigen.id_lote,
            cantidad: pedido.cantidad,
            id_user: id_completado_por,
            id_almacen_origen: pedido.id_almacen,
            id_pedido: pedido.id_pedido,
            comentario: `Consumo de ${pedido.cantidad} kg por orden de tueste ${pedido.id_pedido}`,
        });

        await this.registrarHistorial({
            entidad: HistorialEntidad.LOTE,
            accion: HistorialAccion.UPDATE,
            id_entidad: loteOrigen.id_lote,
            id_user: id_completado_por,
            id_pedido: pedido.id_pedido,
            comentario: `Actualización de pesos por orden de tueste ${pedido.id_pedido}`,
            objeto_antes: {
                cantidad_kg: inventarioLote.cantidad_kg,
                cantidad_tostado_kg: inventarioLote.cantidad_tostado_kg ?? null,
            },
            objeto_despues: {
                cantidad_kg: inventarioPayload.cantidad_kg,
                cantidad_tostado_kg: inventarioPayload.cantidad_tostado_kg ?? inventarioLote.cantidad_tostado_kg ?? null,
            },
        });

        if (nuevoPesoLote === 0) {
            await this.loteRepository.deleteLote(loteOrigen.id_lote);

            await this.registrarHistorial({
                entidad: HistorialEntidad.LOTE,
                accion: HistorialAccion.DELETE,
                id_entidad: loteOrigen.id_lote,
                id_user: id_completado_por,
                id_pedido: pedido.id_pedido,
                comentario: `Lote eliminado por consumo total en orden de tueste ${pedido.id_pedido}`,
            });
        }

        const [createLoteTostadoError, createLoteTostadoDto] = CreateLoteTostadoDto.create({
            id_lote: loteOrigen.id_lote,
            fecha_tostado: new Date(),
            peso: pesoTotalTostado,
            perfil_tostado: pedido.comentario,
            id_user: pedido.id_user
        });

        if (createLoteTostadoError || !createLoteTostadoDto) {
            throw new Error(createLoteTostadoError ?? "Error generando DTO de lote tostado");
        }

        const loteTostado = await this.loteTostadoRepository.createLoteTostado(createLoteTostadoDto);

        await this.inventarioLoteTostadoRepository.createInventario({
            id_lote_tostado: loteTostado.id_lote_tostado,
            id_almacen: pedido.id_almacen,
            cantidad_kg: pesoTotalTostado,
        });

        await this.registrarHistorial({
            entidad: HistorialEntidad.LOTE_TOSTADO,
            accion: HistorialAccion.CREATE,
            id_entidad: loteTostado.id_lote_tostado,
            id_user: id_completado_por,
            id_pedido: pedido.id_pedido,
            comentario: `Creación de lote tostado por orden de tueste ${pedido.id_pedido}`,
        });

        await this.registrarMovimiento({
            tipo: TipoMovimiento.INGRESO,
            entidad: EntidadInventario.LOTE_TOSTADO,
            id_entidad_primario: loteTostado.id_lote_tostado,
            cantidad: pesoTotalTostado,
            id_user: id_completado_por,
            id_almacen_destino: pedido.id_almacen,
            id_pedido: pedido.id_pedido,
            comentario: `Ingreso de lote tostado por orden de tueste ${pedido.id_pedido}`,
        });

        const [updateTuesteError, updateTuesteDto] = UpdateTuesteDto.update({
            id_lote_tostado: loteTostado.id_lote_tostado,
        });
        if (updateTuesteError || !updateTuesteDto) {
            throw new Error(updateTuesteError ?? "Error al generar DTO de tueste");
        }

        for (const tueste of tuestesDelPedido) {
            await this.tuesteRepository.updateTueste(tueste.id_tueste, updateTuesteDto);
        }

        const [updatePedidoError, updatePedidoDto] = UpdatePedidoDto.update({
            id_nuevoLote_tostado: loteTostado.id_lote_tostado,
        });
        if (updatePedidoError || !updatePedidoDto) {
            throw new Error(updatePedidoError ?? "Error al generar DTO de pedido");
        }

        await this.pedidoRepository.updatePedido(pedido.id_pedido, updatePedidoDto);

        return this.pedidoRepository.completarPedido(pedido.id_pedido, id_completado_por);
    }

    async maquilaCompletion(pedidoId: string, id_completado_por: string) {
        const pedido = await this.pedidoRepository.getPedidoById(pedidoId);
        // 1. Validar que el pedido exista, esté pendiente y tenga los datos necesarios para maquila
        if (!pedido || pedido.estado_pedido !== "Pendiente")
            throw new Error("Pedido no válido o ya completado");

        // 2. Verificar que el lote tostado exista
        const loteTostado = await this.loteTostadoRepository.getLoteTostadoById(pedido.id_lote_tostado!);
        if (!loteTostado || loteTostado.peso < 0) {
            throw new Error("Lote tostado no válido o eliminado");
        }

        // 3 Calcular total solicitado en kg
        if (!pedido.cantidad || !pedido.gramaje)
            throw new Error("Cantidad y gramaje requeridos para maquila");
        const totalSolicitadoKg = (pedido.cantidad * pedido.gramaje);

        //4. calcular el total en gramos y verificar que el lote tostado tenga suficiente peso para la cantidad solicitada
        const inventarioLoteTostado = await this.inventarioLoteTostadoRepository.getByLoteTostadoAndAlmacen(loteTostado.id_lote_tostado, pedido.id_almacen!);
        if (!inventarioLoteTostado) {
            throw new Error('No se encontró el inventario para el lote tostado y almacén especificados');
        }
        if (inventarioLoteTostado.cantidad_kg < totalSolicitadoKg) {
            throw new Error(`Stock insuficiente. Solo hay ${inventarioLoteTostado.cantidad_kg} kg disponibles`);
        }

        // 4 Restar stock en lote origen
        const nuevoPesoLote = inventarioLoteTostado.cantidad_kg - totalSolicitadoKg;
        const [, updateInventarioLoteTostadoDto] = UpdateInventarioLoteTostadoDto.update({ cantidad_kg: nuevoPesoLote });
        await this.inventarioLoteTostadoRepository.updateInventario(inventarioLoteTostado.id_inventario, updateInventarioLoteTostadoDto!);
        //eliminar lote si el nuevo peso es  0 
        if (nuevoPesoLote == 0) {
            await this.loteTostadoRepository.deleteLoteTostado(loteTostado.id_lote_tostado);
        }

        // 5. Crear registro en inventario del producto resultante
        await this.inventarioRepository.createInventario({
            id_producto: pedido.id_producto!,
            id_almacen: pedido.id_almacen!,
            id_lote_tostado: loteTostado.id_lote_tostado,
            cantidad: pedido.cantidad,
            gramaje: pedido.gramaje,
            molienda: pedido.molienda!,
            unidad_medida: "BOLSAS"
        });

        // 🔹 6. Marcar pedido como completado
        return this.pedidoRepository.completarPedido(pedidoId, id_completado_por);
    }

    async verifyIfUserHasLote(id_user: string, id_lote_origen: string, tipo_lote: string): Promise<string | null> {

        // 1️. Buscar pedidos del cliente
        const pedidos = await this.pedidoRepository.getPedidosByCliente(id_user);
        const pedidoRelacionado = pedidos.find(
            p => p.id_lote === id_lote_origen
        );
        if (pedidoRelacionado) {
            return pedidoRelacionado.id_nuevoLote ?? null;
        }

        // 2️. Si no hay pedido, buscar directamente en lotes
        const lotes = await this.loteRepository.getLotesByUserId(id_user);
        const loteRelacionado = lotes.find(
            l => l.id_lote.includes(id_lote_origen) && l.tipo_lote === tipo_lote
        );


        return loteRelacionado?.id_lote ?? null;
    }

    private async registrarMovimiento(data: {
        tipo: TipoMovimiento;
        entidad: EntidadInventario;
        id_entidad_primario: string;
        id_entidad_secundario?: string;
        cantidad: number;
        id_user: string;
        id_almacen_origen?: string;
        id_almacen_destino?: string;
        comentario?: string;
        id_pedido?: string,
    }) {
        const [error, dto] = CreateMovimientoAlmacenDto.create(data);
        if (error || !dto) throw new Error(error ?? 'Error al crear movimiento');
        await this.movimientoAlmacenRepository.createMovimiento(dto);
    }

    private async registrarHistorial(data: {
        entidad: HistorialEntidad;
        id_entidad: string;
        id_user: string;
        accion: HistorialAccion;
        comentario?: string;
        objeto_antes?: unknown | null;
        objeto_despues?: unknown | null;
        id_pedido?: string,
    }) {
        const [error, dto] = CreateHistorialDto.create(data);
        if (error || !dto) throw new Error(error ?? 'Error al crear historial');
        await this.historialRepository.createHistorial(dto);
    }
}
