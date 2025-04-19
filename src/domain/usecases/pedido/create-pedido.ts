import { CreateLoteDto } from "../../dtos/lotes/lote/create";
import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
import { CreatePedidoDto } from "../../dtos/pedido/create";
import { CreateTuesteDto } from "../../dtos/tueste/create";
import { LoteEntity } from "../../entities/lote.entity";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";
import { UserRepository } from "../../repository/user.repository";

export interface CreatePedidoUseCase {
    execute(createPedidoDto: CreatePedidoDto): Promise<PedidoEntity>;
}

export class CreatePedido implements CreatePedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository,
        private readonly tuesteRepository: TuesteRepository,

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
        
        
        //crear nuevo lote
        const nombres = user.nombre.trim().split(' ');
        
        const iniciales = `${nombres[0]?.charAt(0) ?? ''}${nombres[1]?.charAt(0) ?? ''}-`.toUpperCase();
        const nuevoIdLote = iniciales + lote.id_lote;
        
        //validar que el lote no exista y si existe actualizarlo
        const loteExistente = await this.loteRepository.getLoteById(nuevoIdLote);
        if (loteExistente) {

            const newpeso_lote = loteExistente?.peso + dto.cantidad;
            const [b, updateLoteDto] = UpdateLoteDto.update({peso: newpeso_lote});
            await this.loteRepository.updateLote(nuevoIdLote, updateLoteDto!);

            const pedido = await this.pedidoRepository.createPedido(dto);
            return PedidoEntity.fromObject(pedido);
        };

        const [error, createLoteDto] = CreateLoteDto.create({
            id_lote: nuevoIdLote,
            productor: lote.productor,
            finca: lote.finca,
            region: lote.region,
            departamento: lote.departamento,
            peso: dto.cantidad,
            variedades: lote.variedades,
            proceso: lote.proceso,
            id_user: user.id_user,
        });

        await this.loteRepository.createLote(createLoteDto!);
        // Crear el pedido
        const pedido = await this.pedidoRepository.createPedido(dto);
        return PedidoEntity.fromObject(pedido);
    }

    private async tostadoVerde(lote: LoteEntity, dto: CreatePedidoDto): Promise<PedidoEntity> {
        //validar cantidad lote
        const cantidadRequerida = dto.cantidad * 1.5;
        if (lote.peso < cantidadRequerida) throw new Error('No hay suficiente cantidad');
       
       //actualizar peso del lote 
        const newpeso = lote.peso-cantidadRequerida;   
        const [a,updateDto] = UpdateLoteDto.update({ peso: newpeso });
        await this.loteRepository.updateLote(lote.id_lote, updateDto!);
        
        //crear pedido
        const pedido = await this.pedidoRepository.createPedido(dto);
  
        //crear tueste
        const cantTuestes = this.generarPesoTuestes(cantidadRequerida);
        console.log('cantTuestes', cantTuestes);
        const fechaTuestes = this.getFechaCercana();
        for (let cant of cantTuestes) {
            let [a,createDto] = CreateTuesteDto.create({
                fecha_tueste: fechaTuestes,
                tostadora: 'Candela',
                peso_entrada: cant,
                id_pedido: pedido.id_pedido,
            });
            console.log('createDto', createDto);
            await this.tuesteRepository.createTueste(createDto!);
        }
        
        return PedidoEntity.fromObject(pedido);
    }

    private generarPesoTuestes(cantidadRequerida: number): number[] {
        const MIN = 2;
        const MAX = 3.5;
        const tuestes: number[] = [];
    
        while (cantidadRequerida >= MIN) {
            // Si la cantidad restante está dentro del rango permitido, úsala directamente
            if (cantidadRequerida <= MAX) {
                tuestes.push(parseFloat(cantidadRequerida.toFixed(2)));
                return tuestes;
            }
    
            // Si no, agrega un bloque máximo y resta
            tuestes.push(MAX);
            cantidadRequerida -= MAX;
        }
    
        // Si quedó un residuo menor al mínimo, intenta redistribuir
        if (cantidadRequerida > 0 && cantidadRequerida < MIN) {
            let distribuido = false;
            for (let i = 0; i < tuestes.length; i++) {
                if (tuestes[i] + cantidadRequerida <= MAX) {
                    tuestes[i] = parseFloat((tuestes[i] + cantidadRequerida).toFixed(2));
                    distribuido = true;
                    break;
                }
            }
    
            if (!distribuido) {
                throw new Error(`No se puede asignar el residuo de ${cantidadRequerida.toFixed(2)} kg sin superar los límites por tueste.`);
            }
        }
    
        return tuestes;
    }
    
    
    
    
    private getFechaCercana(): Date {
        const now = new Date();
        const day = now.getDay(); // 0 (Dom) - 6 (Sáb)
      
        const daysToTuesday = (2 - day + 7) % 7;
        const daysToThursday = (4 - day + 7) % 7;
      
        const nextTuesday = new Date(now);
        nextTuesday.setDate(now.getDate() + daysToTuesday);
      
        const nextThursday = new Date(now);
        nextThursday.setDate(now.getDate() + daysToThursday);
      
        const diffTuesday = Math.abs(nextTuesday.getTime() - now.getTime());
        const diffThursday = Math.abs(nextThursday.getTime() - now.getTime());
      
        return diffTuesday <= diffThursday ? nextTuesday : nextThursday;
    }
}

