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
        const fechaTuestes = this.getFechaCercana();
        for (let cant of cantTuestes) {
           
            let [a,createDto] = CreateTuesteDto.create({
                fecha_tueste: fechaTuestes,
                tostadora: 'Candela',
                peso_entrada: cant,
                id_pedido: pedido.id_pedido,
            });
            await this.tuesteRepository.createTueste(createDto!);

        }
        
        return PedidoEntity.fromObject(pedido);
    }

    private generarPesoTuestes(cantidadRequerida:number): number[] {
        const MIN = 2;
        const MAX = 3.5;
        const tuestes = [];
    
        let cantidad = cantidadRequerida;
        let cantidadEntera = Math.floor(cantidad / MAX);
        let residuo = parseFloat((cantidad % MAX).toFixed(2));
    
        // Si el residuo es menor al mínimo y no es 0, redistribuir
        if (residuo > 0 && residuo < MIN) {
            // intentar distribuir el residuo entre los tuestes
            if (cantidadEntera === 0) {
                // No se puede ni un tueste válido
                return [];
            }
    
            const total = cantidadRequerida;
            const nuevoTamaño = total / cantidadEntera;
    
            // Si redistribuyendo se cumple el rango, ok
            if (nuevoTamaño >= MIN && nuevoTamaño <= MAX) {
                return Array(cantidadEntera).fill(parseFloat(nuevoTamaño.toFixed(2)));
            } else {
                // Si redistribuir no cumple, hacemos un tueste más y ajustamos todos
                cantidadEntera += 1;
                const ajustado = total / cantidadEntera;
    
                if (ajustado >= MIN && ajustado <= MAX) {
                    return Array(cantidadEntera).fill(parseFloat(ajustado.toFixed(2)));
                } else {
                    return []; // No se puede repartir válido
                }
            }
        }
    
        // Si el residuo sí permite un tueste válido, agregarlo al final
        for (let i = 0; i < cantidadEntera; i++) {
            tuestes.push(MAX);
        }
    
        if (residuo >= MIN) {
            tuestes.push(residuo);
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

