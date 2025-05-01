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
import { create } from 'domain';

export interface CreatePedidoUseCase {
    execute(createPedidoDto: CreatePedidoDto): Promise<PedidoEntity>;
}

export class CreatePedido implements CreatePedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository,
        private readonly createLoteUseCase: CreateLoteUseCase
    ){}

    async execute(dto: CreatePedidoDto): Promise<PedidoEntity> {
        //validar lote 
        const lote = await this.loteRepository.getLoteById(dto.id_lote);
        if (!lote || lote.eliminado) throw new Error('El lote no existe');
        const loteEntity = LoteEntity.fromObject(lote);
        //dependiendo del tipo de pedido 
        if (dto.tipo_pedido === 'Venta Verde') {
            return this.ventaVerde(loteEntity, dto);
        }

        if (dto.tipo_pedido === 'Tostado Verde') {
            return this.tostadoVerde(loteEntity, dto);
        }

        if (dto.tipo_pedido === 'Orden Tueste'){

        }

        throw new Error('Tipo de pedido inválido');

    }

    private async ventaVerde(lote: LoteEntity, dto: CreatePedidoDto): Promise<PedidoEntity> {
        //validar cantidad lote
        if (lote.peso < dto.cantidad) throw new Error('No hay suficiente cantidad en el lote');
        //validar cliente
        const user = await this.userRepository.getUserById(dto.id_user);
        if (!user || user.eliminado) throw new Error('El cliente no existe o está eliminado');
        //actualizar peso del lote 
        const newpeso = lote.peso - dto.cantidad;    
        const [a,updateDto] = UpdateLoteDto.update({ peso: newpeso });
        await this.loteRepository.updateLote(lote.id_lote, updateDto!);
        
        
        
        
        const lotes = await this.loteRepository.getLotesByUserId(user.id_user);
        //validar si el usuario tiene un lote del mismo lote Origen
        if (lotes.length > 0) {
            const loteOrigen = lotes.find(l => l.id_lote === lote.id_lote);
            if (loteOrigen) {
                //actualizar peso del lote origen
                const newpesoOrigen = loteOrigen.peso + dto.cantidad;    
                const [,updateDto] = UpdateLoteDto.update({ peso: newpesoOrigen });
                await this.loteRepository.updateLote(loteOrigen.id_lote, updateDto!);
            }               
        }

        
        //crear Nuevo lote
        const [, createLoteDto] = CreateLoteDto.create({
            productor: lote.productor,
            finca: lote.finca,
            region: lote.region,
            departamento: lote.departamento,
            peso: dto.cantidad,
            variedades: lote.variedades,
            proceso: lote.proceso,
            id_user: user.id_user,
            id_analisis: lote.id_analisis,
        });

        const nuevoLote = await this.createLoteUseCase.execute(createLoteDto!);
        // Crear el pedido

        const [,newDto] = CreatePedidoDto.create({
            tipo_pedido: dto.tipo_pedido,
            cantidad: dto.cantidad,
            comentario: dto.comentario,
            id_user: dto.id_user,
            id_lote: lote.id_lote,
            id_nuevoLote: nuevoLote.id_lote,
        });

        const pedido = await this.pedidoRepository.createPedido(newDto!);
        return PedidoEntity.fromObject(pedido);
    }

    private async tostadoVerde(lote: LoteEntity, dto: CreatePedidoDto): Promise<PedidoEntity> {
        //validar cantidad lote
        const cantidadRequerida = dto.cantidad * 1.15;
        if (lote.peso < cantidadRequerida) throw new Error('No hay suficiente cantidad');
       //validar cliente
       const user = await this.userRepository.getUserById(dto.id_user);
       if (!user || user.eliminado) throw new Error('El cliente no existe o está eliminado');
       
        //validar si el usuario tiene un lote del mismo lote Origen
        const lotes = await this.loteRepository.getLotesByUserId(user.id_user);
        if (lotes.length > 0) {
            const loteOrigen = lotes.find(l => l.id_lote === lote.id_lote);
            if (loteOrigen) {
                //actualizar peso del lote origen
                const newpesoOrigen = loteOrigen.peso + cantidadRequerida;    
                const [,updateDto] = UpdateLoteDto.update({ peso: newpesoOrigen });
                await this.loteRepository.updateLote(loteOrigen.id_lote, updateDto!);
            }               
        }

       //actualizar peso del lote 
        const newpeso = lote.peso-cantidadRequerida;   
        const [,updateDto] = UpdateLoteDto.update({ peso: newpeso });
        await this.loteRepository.updateLote(lote.id_lote, updateDto!);
  
        //crear Nuevo lote
        const [,createLoteDto] = CreateLoteDto.create({
            id_lote     : lote.id_lote,
            productor   : lote.productor,
            finca       : lote.finca,
            region      : lote.region,
            departamento: lote.departamento,
            peso        : cantidadRequerida,
            variedades  : lote.variedades,
            proceso     : lote.proceso,
            id_user     : dto.id_user,
            id_analisis : lote.id_analisis,
        });
        const nuevoLote = await this.createLoteUseCase.execute(createLoteDto!,'Tostado Verde');

        //crear pedido

        const [,newDto] = CreatePedidoDto.create({
            tipo_pedido: dto.tipo_pedido,
            cantidad: dto.cantidad,
            comentario: dto.comentario,
            id_user: dto.id_user,
            id_lote: lote.id_lote,
            id_nuevoLote: nuevoLote.id_lote,
        });

        const pedido = await this.pedidoRepository.createPedido(newDto!);
  
        return PedidoEntity.fromObject(pedido);
    }

    

    
    
}

