
import { PedidoEntity } from "../../domain/entities/pedido.entity";
import { CreatePedidoDto } from '../../domain/dtos/pedido/create';
import { prisma } from "../../data/postgres";
import { UpdatePedidoDto } from '../../domain/dtos/pedido/update';
import { PedidoDatasource } from "../../domain/datasources/pedido.datasource";
import { error } from "console";
import { LoteEntity } from "../../domain/entities/lote.entity";
import { CreatePedido } from '../../domain/usecases/pedido/create-pedido';



export  class PedidoDataSourceImpl implements PedidoDatasource{

    
    async createPedido(createPedidoDto:CreatePedidoDto): Promise<PedidoEntity> {
        const newPedido =  await prisma.pedido.create({
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
        const pedidoEliminado = await prisma.pedido.delete({
            where: { id_pedido: id }
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
    async getPedidosByCliente(id_user: string): Promise<PedidoEntity[]> {
        const user = prisma.user.findFirst({
            where: {
                id_user: id_user,
                eliminado: false
            }
        });
        
        if(!user) throw new Error('El cliente no existe');
        const pedidos = await prisma.pedido.findMany({
            where: {
                id_user: id_user,
                eliminado: false
            }
        });
        return pedidos.map( (pedido) => PedidoEntity.fromObject(pedido));
    }
    
    
    async completarPedido(id: string): Promise<PedidoEntity> {
        const pedido =  await this.getPedidoById(id);
        const pedidoCompletado = await prisma.pedido.update({
            where: { id_pedido: id },
            data: { estado_pedido: 'Completado' }
        });
        return PedidoEntity.fromObject(pedidoCompletado);
        
        
        
        
    }
    async getAllPedidos(): Promise<PedidoEntity[]> {
        const pedidos = await prisma.pedido.findMany({
            where: {
                eliminado: false,
                estado_pedido: { not: 'Completado' }
            }
        });
        return pedidos.map( (pedido) => PedidoEntity.fromObject(pedido));
    }

    
    async getPedidosOrdenTueste(): Promise<PedidoEntity[]> {
        const pedidos = await prisma.pedido.findMany({
          where: {
            eliminado: false,
            tipo_pedido: {
              equals: 'Orden Tueste',
              mode: 'insensitive'
            },
            estado_pedido: { not: 'Completado' }
          }
        });
      
        return pedidos.map((pedido) => PedidoEntity.fromObject(pedido));
    }

    async GetPedidosOrdenTuesteByFecha(fecha: Date): Promise<PedidoEntity[]> {
        const pedidos = await prisma.pedido.findMany({
          where: {
            eliminado: false,
            tipo_pedido: {
              equals: 'Orden Tueste',
              mode: 'insensitive'
            },
            fecha_tueste: fecha,
          }
        });
        return pedidos.map((pedido) => PedidoEntity.fromObject(pedido));
    }

}
