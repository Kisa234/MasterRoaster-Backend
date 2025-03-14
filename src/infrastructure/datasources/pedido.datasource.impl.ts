import { PedidoDataSource } from "../../domain/datasources/pedido.datasource";
import { PedidoEntity } from "../../domain/entities/pedido.entity";
import { CreatePedidoDto } from '../../domain/dtos/pedido/create';
import { create } from 'domain';
import { prisma } from "../../data/postgres";
import { UpdatePedidoDto } from '../../domain/dtos/pedido/update';
import { UserRepositoryImpl } from "../repositories/user.repository.impl";
import { GetUser } from '../../domain/usecases/user/get-user';


export  class PedidoDataSourceImpl implements PedidoDataSource {


    

    async createPedido(createPedidoDto:CreatePedidoDto): Promise<PedidoEntity> {
        const newPedido = await prisma.pedido.create({
            data: createPedidoDto!
        });
        return PedidoEntity.fromObject(newPedido);
    }
    async getPedidoById(id: string): Promise<PedidoEntity | null> {
        const pedido = await prisma.pedido.findFirst({
            where: {
                id_pedido: id,
                eliminado: false
            }
        });
        if (!pedido) return null;
        return PedidoEntity.fromObject(pedido);
    }
    async updatePedido(id: string, updatePedidoDto:UpdatePedidoDto): Promise<PedidoEntity> {
        const pedido = this.getPedidoById(id);
        const updatedPedido = await prisma.pedido.update({
            where: { id_pedido: id },
            data: updatePedidoDto.values
        });
        return PedidoEntity.fromObject(updatedPedido);
    }
    async deletePedido(id: string): Promise<PedidoEntity> {
        const pedido = this.getPedidoById(id);
        const pedidoEliminado = await prisma.pedido.update({
            where: { id_pedido: id },
            data: { eliminado: true }
        });
        return PedidoEntity.fromObject(pedidoEliminado);
        
    }
    async getPedidosByEstado(estado: string): Promise<PedidoEntity[]> {
        const pedidos = await prisma.pedido.findMany({
            where: {
                estado_pedido: estado,
                eliminado: false
            }
        });
        return pedidos.map( (pedido) => PedidoEntity.fromObject(pedido));
    }
    async getPedidosByCliente(cliente_id: string): Promise<PedidoEntity[]> {
        const user = prisma.user.findFirst({
            where: {
                id_user: cliente_id,
                eliminado: false
            }
        });
            
        if(!user) throw new Error('El cliente no existe');
        const pedidos = await prisma.pedido.findMany({
            where: {
                cliente_id: cliente_id,
                eliminado: false
            }
        });
        return pedidos.map( (pedido) => PedidoEntity.fromObject(pedido));
    }
    async asignarPedido(id_pedido: string, asignado_a_id: string): Promise<PedidoEntity> {
        const user = prisma.user.findFirst({
            where: {
                id_user:asignado_a_id,
                eliminado: false
            }
        });
        if(!user) throw new Error('El cliente no existe');
        const pedido = this.getPedidoById(id_pedido);
        const pedidoAsignado = await prisma.pedido.update({
            where: { id_pedido: id_pedido , eliminado: false},
            data: { asignado_a_id: asignado_a_id }
        });
        return PedidoEntity.fromObject(pedidoAsignado);
    }
    async aceptarPedido(id_pedido: string): Promise<PedidoEntity> {
        const pedido = this.getPedidoById(id_pedido);
        const pedidoAceptado = await prisma.pedido.update({
            where: { id_pedido: id_pedido , eliminado: false},
            data: { estado_pedido: 'Aceptado' }
        });
        return PedidoEntity.fromObject(pedidoAceptado);
    }
    async completarPedido(id_pedido: string): Promise<PedidoEntity> {
        const pedido = this.getPedidoById(id_pedido);
        const pedidoCompletado = await prisma.pedido.update({
            where: { id_pedido: id_pedido , eliminado: false},
            data: { estado_pedido: 'Completado' }
        }); 
        return PedidoEntity.fromObject(pedidoCompletado);
    }

    
}
