import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { DuplicateLoteUseCase } from './../lote/lote/duplicar-lote';
import { UpdatePedidoDto } from '../../dtos/pedido/update';
import { InventarioProductoRepository } from "../../repository/inventario-producto.repository";
import { LoteTostadoRepository } from "../../repository/loteTostado.repository";
import { UpdateLoteTostadoDto } from "../../dtos/lotes/lote-tostado/update";
import { InventarioLoteRepository } from "../../repository/inventario-lote.repository";
import { InventarioLoteTostadoRepository } from "../../repository/inventario-lote-tostado.repository";
import { UpdateInventarioLoteDto } from "../../dtos/inventarios/inventario-lote/update";
import { UpdateInventarioLoteTostadoDto } from "../../dtos/inventarios/inventario-lote-tostado/update";

export interface CompletarPedidoUseCase {
    execute(id_pedido: string): Promise<PedidoEntity>;
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
    ) { }

    async execute(id_pedido: string): Promise<PedidoEntity> {
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
                return this.ventaVerdeCompletion(pedido.id_pedido);
                break;
            case 'Tostado Verde':
                return this.tostadoVerdeCompletion(pedido.id_pedido);
                break;
            case 'Orden Tueste':
                return this.pedidoRepository.completarPedido(id_pedido);
                break
            case 'Maquila':
                return this.maquilaCompletion(pedido.id_pedido);
                break
            case 'Suscripcion':
                return this.pedidoRepository.completarPedido(id_pedido);
                break;
            default:
                throw new Error('Tipo de pedido inválido');
        }

    }


    async ventaVerdeCompletion(pedidoId: string) {
        const pedido = await this.pedidoRepository.getPedidoById(pedidoId);
        if (!pedido || pedido.estado_pedido !== "Pendiente") throw new Error("Pedido no válido");

        const loteOrigen = await this.loteRepository.getLoteById(pedido.id_lote!);
        if (!loteOrigen) throw new Error("Lote origen no válido");


        // verificar que el lote tenga suficiente peso para la cantidad solicitada en su almacen correspondiente
        const inventarioLote = await this.inventarioLoteRepository.getByLoteAndAlmacen(loteOrigen.id_lote, pedido.id_almacen!);
        if (!inventarioLote || inventarioLote.cantidad_kg < pedido.cantidad) {
            throw new Error("Stock insuficiente en el almacén");
        }

        // restar stock en lote origen
        const nuevoPesoLote = inventarioLote.cantidad_kg - pedido.cantidad;
        const [, updateInventarioLoteDto] = UpdateInventarioLoteDto.update({ cantidad_kg: nuevoPesoLote });
        await this.inventarioLoteRepository.updateInventario(inventarioLote.id_inventario, updateInventarioLoteDto!);
        //eliminar lote si el nuevo peso es  0 
        if (nuevoPesoLote == 0) {
            await this.loteRepository.deleteLote(loteOrigen.id_lote);
        }

        // crear lote destino o actualizar existente
        // Verificar si el cliente ya tiene un lote nuevo creado desde este mismo lote original y del mismo tipo de pedido
        const hasLote = await this.verifyIfUserHasLote(pedido.id_user, loteOrigen.id_lote, 'Lote Verde');
        if (!hasLote) {
            // crear nuevo lote
            const nuevoLoteDestino = await this.duplicateLoteUseCase.execute(loteOrigen, pedido, false);
            // crear un inventario para el nuevo lote 
            const nuevoInventarioLote = await this.inventarioLoteRepository.createInventario({
                id_lote: nuevoLoteDestino.id_lote!,
                id_almacen: pedido.id_almacen!,
                cantidad_kg: pedido.cantidad,
            });
            // actualizar pedido
            const [, updatePedidoDto] = UpdatePedidoDto.update({
                id_nuevoLote: await nuevoLoteDestino.id_lote,
            });
            await this.pedidoRepository.updatePedido(pedidoId, updatePedidoDto!);
            // marcar pedido como completado
            return this.pedidoRepository.completarPedido(pedidoId);
        } else {
            // actualizar lote existente
            // actualizar stock del lote existente en su inventario correspondiente
            const inventarioLoteExistente = await this.inventarioLoteRepository.getByLoteAndAlmacen(hasLote, pedido.id_almacen!);
            if (!inventarioLoteExistente) throw new Error("Inventario del lote existente no encontrado");
            const nuevoPesoInventario = inventarioLoteExistente.cantidad_kg + pedido.cantidad;
            const [, updateInventarioLoteExistenteDto] = UpdateInventarioLoteDto.update({ cantidad_kg: nuevoPesoInventario });
            await this.inventarioLoteRepository.updateInventario(inventarioLoteExistente.id_inventario, updateInventarioLoteExistenteDto!);
            // en caso el lote existente este como eliminado, reactivarlo
            const loteExistente = await this.loteRepository.getLoteById(hasLote);
            if (!loteExistente) throw new Error("Lote existente no encontrado");
            if (loteExistente.eliminado) {
                const [error, updateLoteDto] = UpdateLoteDto.update({ eliminado: false });
                if (error) throw new Error(`Error al actualizar lote: ${error}`);
                await this.loteRepository.updateLote(loteExistente.id_lote, updateLoteDto!);
            }
            // marcar pedido como completado
            return this.pedidoRepository.completarPedido(pedidoId);

        }



    }

    async tostadoVerdeCompletion(pedidoId: string) {
        const pedido = await this.pedidoRepository.getPedidoById(pedidoId);
        if (!pedido || pedido.estado_pedido !== "Pendiente") throw new Error("Pedido no válido");

        const loteOrigen = await this.loteRepository.getLoteById(pedido.id_lote!);
        if (!loteOrigen) throw new Error("Lote origen no válido");

       // verificar que el lote tenga suficiente peso para la cantidad solicitada en su almacen correspondiente
        const cantidadVerde = pedido.cantidad * 1.1765;
        const inventarioLote = await this.inventarioLoteRepository.getByLoteAndAlmacen(loteOrigen.id_lote, pedido.id_almacen!);
        if (!inventarioLote || inventarioLote.cantidad_kg < cantidadVerde) {
            throw new Error("Stock insuficiente en el almacén");
        }
         // restar stock en lote origen
        const nuevoPesoLote = inventarioLote.cantidad_kg - cantidadVerde;
        const [, updateInventarioLoteDto] = UpdateInventarioLoteDto.update({ cantidad_kg: nuevoPesoLote });
        await this.inventarioLoteRepository.updateInventario(inventarioLote.id_inventario, updateInventarioLoteDto!);
        //eliminar lote si el nuevo peso es  0 
        if (nuevoPesoLote == 0) {
            await this.loteRepository.deleteLote(loteOrigen.id_lote);
        }

        // crear lote destino o actualizar existente
        // Verificar si el cliente ya tiene un lote nuevo creado desde este mismo lote original y del mismo tipo de pedido
        const hasLote = await this.verifyIfUserHasLote(pedido.id_user, loteOrigen.id_lote, 'Lote Tostado');
        if (!hasLote) {
            // crear nuevo lote
            const nuevoLoteDestino = await this.duplicateLoteUseCase.execute(loteOrigen, pedido, true);
            // crear un inventario para el nuevo lote
            const nuevoInventarioLote = await this.inventarioLoteRepository.createInventario({
                id_lote: nuevoLoteDestino.id_lote!,
                id_almacen: pedido.id_almacen!,
                cantidad_kg: pedido.cantidad,
            });
            // actualizar pedido
            const [, updatePedidoDto] = UpdatePedidoDto.update({
                id_nuevoLote: await nuevoLoteDestino.id_lote,
            });
            await this.pedidoRepository.updatePedido(pedidoId, updatePedidoDto!);

            // marcar pedido como completado
            return this.pedidoRepository.completarPedido(pedidoId);
        } else {
            // actualizar lote existente
            // actualizar stock del lote existente en su inventario correspondiente
            const inventarioLoteExistente = await this.inventarioLoteRepository.getByLoteAndAlmacen(hasLote, pedido.id_almacen!);
            if (!inventarioLoteExistente) throw new Error("Inventario del lote existente no encontrado");
            const nuevoPesoInventario = inventarioLoteExistente.cantidad_kg + pedido.cantidad;
            const [, updateInventarioLoteExistenteDto] = UpdateInventarioLoteDto.update({ cantidad_kg: nuevoPesoInventario });
            await this.inventarioLoteRepository.updateInventario(inventarioLoteExistente.id_inventario, updateInventarioLoteExistenteDto!);
            // en caso el lote existente este como eliminado, reactivarlo
            const loteExistente = await this.loteRepository.getLoteById(hasLote);
            if (!loteExistente) throw new Error("Lote existente no encontrado");
            if (loteExistente.eliminado) {
                const [error, updateLoteDto] = UpdateLoteDto.update({ eliminado: false });
                if (error) throw new Error(`Error al actualizar lote: ${error}`);
                await this.loteRepository.updateLote(loteExistente.id_lote, updateLoteDto!);
            }
            // marcar pedido como completado
            return this.pedidoRepository.completarPedido(pedidoId);

        }
    }

    async maquilaCompletion(pedidoId: string) {
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
        return this.pedidoRepository.completarPedido(pedidoId);
    }

    async verifyIfUserHasLote(id_user: string,id_lote_origen: string,tipo_lote: string): Promise<string | null> {

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
}
