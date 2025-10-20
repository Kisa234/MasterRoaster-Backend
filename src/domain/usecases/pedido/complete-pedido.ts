import { CreateLoteDto } from '../../dtos/lotes/lote/create';
import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
import { CreatePedidoDto } from "../../dtos/pedido/create";
import { CreateTuesteDto } from "../../dtos/tueste/create";
import { LoteEntity } from "../../entities/lote.entity";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";
import { UserRepository } from "../../repository/user.repository";
import { CreateLoteUseCase } from '../lote/lote/create-lote';
import { AnalisisRepository } from '../../repository/analisis.repository';
import { AnalisisFisicoRepository } from '../../repository/analisisFisico.repository';
import { AnalisisFisicoEntity } from '../../entities/analisisFisico.entity';
import { AnalisisSensorialRepository } from '../../repository/analisisSensorial.repository';
import { AnalisisDefectosRespository } from '../../repository/analisisDefectos.repository';
import { CreateAnalisisFisicoDto } from '../../dtos/analisis/fisico/create';
import { CreateAnalisisSensorialDTO } from '../../dtos/analisis/sensorial/create';
import { CreateAnalisisDto } from '../../dtos/analisis/analisis/create';
import { CreateLoteAnalisisDto } from '../../dtos/lote-analisis/create';
import { LoteAnalisisRepository } from '../../repository/lote-analisis.repository';
import { CreateAnalisisDefectosDto } from '../../dtos/analisis/defectos/create';
import { Pedido } from '@prisma/client';
import PedidoRepositoryImpl from './../../../infrastructure/repositories/pedido.repository.impl';
import { error } from 'console';
import { DuplicateLoteUseCase } from './../lote/lote/duplicar-lote';
import { UpdatePedidoDto } from '../../dtos/pedido/update';

export interface CompletarPedidoUseCase {
    execute(id_pedido: string): Promise<PedidoEntity>;
}

export class CompletarPedido implements CompletarPedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly duplicateLoteUseCase: DuplicateLoteUseCase,
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
            default:
                throw new Error('Tipo de pedido inválido');
        }

        // Marcar como completado
        return this.pedidoRepository.completarPedido(id_pedido);
    }


    async ventaVerdeCompletion(pedidoId: string) {
        const pedido = await this.pedidoRepository.getPedidoById(pedidoId);
        if (!pedido || pedido.estado_pedido !== "Pendiente") throw new Error("Pedido no válido");

        const loteOrigen = await this.loteRepository.getLoteById(pedido.id_lote);
        if (!loteOrigen) throw new Error("Lote origen no válido");

        // restar stock en lote origen
        if (loteOrigen.peso < pedido.cantidad) throw new Error("Stock insuficiente");
        loteOrigen.peso -= pedido.cantidad;
        if (loteOrigen.peso <= 0) {
            await this.loteRepository.deleteLote(loteOrigen.id_lote);
        } else {
            const [error, updateLoteDto] = UpdateLoteDto.update({ peso: loteOrigen.peso });
            if (error) throw new Error(`Error al actualizar lote: ${error}`);
            await this.loteRepository.updateLote(loteOrigen.id_lote, updateLoteDto!);
        }

        // crear lote destino o actualizar existente
        // Verificar si el cliente ya tiene un lote nuevo creado desde este mismo lote original y del mismo tipo de pedido
        const hasLote = await this.verifyIfUserHasLote(pedido.id_user, loteOrigen.id_lote, 'Lote Verde');
        if (!hasLote) {
            // crear nuevo lote
            const nuevoLoteDestino = await this.duplicateLoteUseCase.execute(loteOrigen, pedido, false);
            // actualizar pedido
            const [, updatePedidoDto] = UpdatePedidoDto.update({
                id_nuevoLote: await nuevoLoteDestino.id_lote,
            });
            await this.pedidoRepository.updatePedido(pedidoId, updatePedidoDto!);

            // marcar pedido como completado
            return this.pedidoRepository.completarPedido(pedidoId);
        } else {
            // actualizar lote existente
            // obtener pedidos
            const pedidos = await this.pedidoRepository.getPedidosByCliente(pedido.id_user);
            // obtener el pedido relacionado con este lote original y tipo de pedido
            const pedidoRelacionado = pedidos.find(p => p.id_lote === loteOrigen.id_lote && p.tipo_pedido === pedido.tipo_pedido);
            // obtener el lote nuevo relacionado
            const loteNuevoRelacionado = await this.loteRepository.getLoteById(pedidoRelacionado!.id_nuevoLote!);
            // actualizar peso del lote nuevo
            const nuevoPeso = loteNuevoRelacionado!.peso + pedido.cantidad;
            const [error, updateLoteDto] = UpdateLoteDto.update(
                {
                    peso: nuevoPeso,
                }
            );
            this.loteRepository.updateLote(loteNuevoRelacionado!.id_lote, updateLoteDto!);
            // marcar pedido como completado
            return this.pedidoRepository.completarPedido(pedidoId);

        }



    }

    async tostadoVerdeCompletion(pedidoId: string) {
        const pedido = await this.pedidoRepository.getPedidoById(pedidoId);
        if (!pedido || pedido.estado_pedido !== "Pendiente") throw new Error("Pedido no válido");

        const loteOrigen = await this.loteRepository.getLoteById(pedido.id_lote);
        if (!loteOrigen) throw new Error("Lote origen no válido");

        // restar stock en lote origen
        if (loteOrigen.peso < pedido.cantidad * 1.15) throw new Error("Stock insuficiente");
        loteOrigen.peso -= pedido.cantidad * 1.15;
        if (loteOrigen.peso <= 0) {
            const [error, updateLoteDto] = UpdateLoteDto.update({ peso: loteOrigen.peso });
            if (error) throw new Error(`Error al actualizar lote: ${error}`);
            await this.loteRepository.updateLote(loteOrigen.id_lote, updateLoteDto!);
            await this.loteRepository.deleteLote(loteOrigen.id_lote);
        } else {
            const [error, updateLoteDto] = UpdateLoteDto.update({ peso: loteOrigen.peso });
            if (error) throw new Error(`Error al actualizar lote: ${error}`);
            await this.loteRepository.updateLote(loteOrigen.id_lote, updateLoteDto!);
        }

        // crear lote destino o actualizar existente
        // Verificar si el cliente ya tiene un lote nuevo creado desde este mismo lote original y del mismo tipo de pedido
        const hasLote = await this.verifyIfUserHasLote(pedido.id_user, loteOrigen.id_lote, 'Lote Tostado');
        if (!hasLote) {
            // crear nuevo lote
            const nuevoLoteDestino = await this.duplicateLoteUseCase.execute(loteOrigen, pedido, true);
            // actualizar pedido
            const [, updatePedidoDto] = UpdatePedidoDto.update({
                id_nuevoLote: await nuevoLoteDestino.id_lote,
            });
            await this.pedidoRepository.updatePedido(pedidoId, updatePedidoDto!);

            // marcar pedido como completado
            return this.pedidoRepository.completarPedido(pedidoId);
        } else {
            // actualizar lote existente
            // obtener pedidos
            const pedidos = await this.pedidoRepository.getPedidosByCliente(pedido.id_user);
            // obtener el pedido relacionado con este lote original y tipo de pedido
            const pedidoRelacionado = pedidos.find(p => p.id_lote === loteOrigen.id_lote && p.tipo_pedido === pedido.tipo_pedido);
            // obtener el lote nuevo relacionado
            const loteNuevoRelacionado = await this.loteRepository.getLoteById(pedidoRelacionado!.id_nuevoLote!);
            // actualizar peso del lote nuevo
            const nuevoPeso = loteNuevoRelacionado!.peso + pedido.cantidad;
            const [error, updateLoteDto] = UpdateLoteDto.update(
                {
                    peso: nuevoPeso,
                }
            );
            this.loteRepository.updateLote(loteNuevoRelacionado!.id_lote, updateLoteDto!);
            // marcar pedido como completado
            return this.pedidoRepository.completarPedido(pedidoId);

        }
    }


    async verifyIfUserHasLote(id_user: string, id_lote_origen: string, tipo_lote: string): Promise<Boolean> {
        const lote = await this.loteRepository.getLoteById(id_lote_origen);
        if (!lote) throw new Error("Lote no válido");

        return lote.id_user === id_user && lote.tipo_lote === tipo_lote;
    }




}
