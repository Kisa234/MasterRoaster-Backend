
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
        let lote = await prisma.lote.findFirst({
            where: {
                id_lote: createPedidoDto.id_lote,
                eliminado: false,
            }
        })
        if (!lote) {throw new Error('El lote no existe')}
        lote = LoteEntity.fromObject(lote);
        
        if (createPedidoDto.tipo_pedido === 'Tostado Verde') {
            return this.tostadoVerde(lote,createPedidoDto);
        }
        else if (createPedidoDto.tipo_pedido === 'Venta Verde') {
            return this.ventaVerde(lote,createPedidoDto);
        }
        else throw new Error('El tipo de pedido no es válido');
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
    async getPedidosByCliente(user_id: string): Promise<PedidoEntity[]> {
        const user = prisma.user.findFirst({
            where: {
                id_user: user_id,
                eliminado: false
            }
        });
        
        if(!user) throw new Error('El cliente no existe');
        const pedidos = await prisma.pedido.findMany({
            where: {
                user_id: user_id,
                eliminado: false
            }
        });
        return pedidos.map( (pedido) => PedidoEntity.fromObject(pedido));
    }
    
    
    async completarPedido(id: string): Promise<PedidoEntity> {
        const pedido =  await this.getPedidoById(id);
        const pedidoCompletado = await prisma.pedido.update({
            where: { id_pedido: id },
            data: { estado_pedido: 'COMPLETADO' }
        });
        return PedidoEntity.fromObject(pedidoCompletado);



        
    }

    
    async ventaVerde(lote: LoteEntity, createPedidoDto: CreatePedidoDto): Promise<PedidoEntity> {
        // Verificar que el lote tenga suficiente peso
        if (lote.peso < createPedidoDto.cantidad) {
            throw new Error('No hay suficiente cantidad en el lote');
        }
    
        // Obtener los datos del usuario (cliente)
        const user = await prisma.user.findFirst({
            where: {
                id_user: createPedidoDto.user_id,
                eliminado: false
            }
        });
    
        if (!user) throw new Error('El cliente no existe o está eliminado');
    
        // Generar el nuevo ID de lote basado en las iniciales del nombre del cliente
        const nombres: string[] = user.nombre.trim().split(' ');
        const iniciales = `${nombres[0]?.charAt(0) ?? ''}${nombres[1]?.charAt(0) ?? ''}-`.toUpperCase();
        const nuevoIdLote = iniciales + lote.id_lote;
        
        

        // Crear un nuevo lote con la cantidad del pedido
        const newLote = await prisma.lote.create({
            data: {
                id_lote       :nuevoIdLote ,
                productor     :lote.productor,
                finca         :lote.finca ,
                region        :lote.region ,
                departamento  :lote.departamento ,
                peso          :createPedidoDto.cantidad, 
                variedades    :lote.variedades ,
                proceso       :lote.proceso ,
                user_id       :createPedidoDto.user_id,
                analisis_id   :lote.analisis_id,      
            }
        });

        // Actualizar el lote original restando la cantidad vendida
        await prisma.lote.update({
            where: { id_lote: lote.id_lote },
            data: { peso: lote.peso - createPedidoDto.cantidad }
        });
          
    
        // Crear el nuevo pedido asociado al nuevo lote
        const newPedido = await prisma.pedido.create({
            data: createPedidoDto
        });
    
        return PedidoEntity.fromObject(newPedido);
    }
    

    
    async tostadoVerde(lote:LoteEntity,createPedidoDto:CreatePedidoDto): Promise <PedidoEntity>{
        if (lote.peso < (createPedidoDto.cantidad * 1.5)) throw new Error('No hay suficiente cantidad en el lote');
            await prisma.lote.update({
                where: { id_lote: lote.id_lote },
                data: { peso: lote.peso - (createPedidoDto.cantidad * 1.5) }
            });

            const newPedido = await prisma.pedido.create({
                data: createPedidoDto!
            });

            return PedidoEntity.fromObject(newPedido);
    }
    
}
