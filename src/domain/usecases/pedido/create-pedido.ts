import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
import { CreatePedidoDto } from "../../dtos/pedido/create";
import { CreateTuesteDto } from "../../dtos/tueste/create";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";
import { UserRepository } from "../../repository/user.repository";
import { AnalisisRepository } from '../../repository/analisis.repository';
import { AnalisisFisicoRepository } from '../../repository/analisisFisico.repository';
import { AnalisisFisicoEntity } from '../../entities/analisisFisico.entity';
import { LoteTostadoRepository } from "../../repository/loteTostado.repository";
import { UpdateUserDto } from "../../dtos/user/update";


export interface CreatePedidoUseCase {
    execute(createPedidoDto: CreatePedidoDto): Promise<PedidoEntity>;
}

export class CreatePedido implements CreatePedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly loteTostadoRepository: LoteTostadoRepository,
        private readonly clienteRepository: UserRepository,
        private readonly tuesteRepository: TuesteRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,

    ) { }

    async execute(dto: CreatePedidoDto): Promise<PedidoEntity> {
        //dependiendo del tipo de pedido 
        switch (dto.tipo_pedido) {
            case 'Venta Verde':
                return this.ventaVerdeValidations(dto);
                break;
            case 'Tostado Verde':
                return this.tostadoVerdeValidations(dto);
                break;
            case 'Orden Tueste':
                return this.ordenTueste(dto);
                break
            case 'Maquila':
                return this.maquilaValidations(dto);
                break;
            case 'Suscripcion':
                return this.suscripcionValidations(dto);
                break;
            default:
                throw new Error('Tipo de pedido inválido');
        }

    }

    async ventaVerdeValidations(dto: CreatePedidoDto): Promise<PedidoEntity> {
        const lote = await this.loteRepository.getLoteById(dto.id_lote!);
        if (!lote || lote.eliminado) throw new Error("Lote no válido");

        if (lote.peso < dto.cantidad) throw new Error("Stock insuficiente");

        const cliente = await this.clienteRepository.getUserById(dto.id_user);
        if (!cliente || cliente.eliminado) throw new Error("Cliente no válido");

        return this.pedidoRepository.createPedido(dto);

    }

    async tostadoVerdeValidations(dto: CreatePedidoDto): Promise<PedidoEntity> {
        const lote = await this.loteRepository.getLoteById(dto.id_lote!);
        if (!lote || lote.eliminado) throw new Error("Lote no válido");

        const cantidadVerde = dto.cantidad * 1.15;
        if (lote.peso < cantidadVerde) throw new Error("Stock insuficiente");

        const cliente = await this.clienteRepository.getUserById(dto.id_user);
        if (!cliente || cliente.eliminado) throw new Error("Cliente no válido");

        return this.pedidoRepository.createPedido(dto);
    }

    async ordenTueste(dto: CreatePedidoDto): Promise<PedidoEntity> {
        if (dto.id_lote == null) { throw new Error('El id_lote es requerido para una orden de tueste'); }
        const lote = await this.loteRepository.getLoteById(dto.id_lote!);
        if (!lote || lote.eliminado) { throw new Error('Lote no válido'); }

        // 1. Verificar que hay suficiente peso en el lote 
        if (lote.peso < dto.cantidad) {
            throw new Error('No hay suficiente cantidad en el lote');
        }
        // actualizar peso del lote original si es lote verde
        if (lote.tipo_lote === 'Lote Verde') {
            const nuevoPesoLote = lote.peso - dto.cantidad;
            const [, updateLoteDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });
            console.log('Actualizando lote:', lote.id_lote, 'Nuevo peso:', nuevoPesoLote);

            await this.loteRepository.updateLote(lote.id_lote, updateLoteDto!);

            //eliminar lote si el nuevo peso es  0 
            if (nuevoPesoLote == 0) {
                await this.loteRepository.deleteLote(lote.id_lote);
            }
        }


        // 2. Validar que el cliente existe y no está eliminado
        const user = await this.clienteRepository.getUserById(dto.id_user);
        if (!user || user.eliminado) {
            throw new Error('El cliente no existe o está eliminado');
        }

        // 3. Validar que el lote tiene un análisis asociado
        let analisisFisico: AnalisisFisicoEntity | null = null;

        if (!lote.id_analisis) {
            console.warn('El lote no tiene un análisis asociado, usando valores por defecto');
        } else {
            const analisis = await this.analisisRepository.getAnalisisById(lote.id_analisis);
            if (!analisis) {
                console.warn(`No se encontró el análisis ${lote.id_analisis}, usando valores por defecto`);
            } else {
                analisisFisico = await this.analisisFisicoRepository
                    .getAnalisisFisicoById(analisis.analisisFisico_id!);
                if (!analisisFisico) {
                    console.warn(`No se encontró el análisis físico ${analisis.analisisFisico_id}, usando valores por defecto`);
                }
            }
        }


        // 5. Crear Pedido
        const pedido = await this.pedidoRepository.createPedido(dto);

        //6. Generar Tuestes
        if (!dto.pesos) throw new Error('Los pesos son requeridos');
        const density = analisisFisico?.densidad ?? 0;
        const humidity = analisisFisico?.humedad ?? 0;
        let cant = 1;
        for (let peso of dto.pesos) {
            const [, createTuesteDto] = CreateTuesteDto.create({
                id_lote: lote.id_lote,
                num_batch: cant,
                fecha_tueste: dto.fecha_tueste,
                tostadora: dto.tostadora,
                id_cliente: dto.id_user,
                densidad: density,
                humedad: humidity,
                peso_entrada: peso,
                id_pedido: pedido.id_pedido,
            });
            await this.tuesteRepository.createTueste(createTuesteDto!);
            cant++;
        }
        return PedidoEntity.fromObject(pedido);
    }

    async maquilaValidations(dto: CreatePedidoDto): Promise<PedidoEntity> {

        console.log(dto);

        // 1. Verificar que el lote tostado exista
        const loteTostado = await this.loteTostadoRepository.getLoteTostadoById(dto.id_lote_tostado!);
        if (!loteTostado || loteTostado.peso < 0) {
            throw new Error("Lote tostado no válido o eliminado");
        }

        // Validar campos requeridos
        if (!dto.gramaje) throw new Error('El gramaje es requerido para pedidos de maquila');
        if (!dto.cantidad) throw new Error('La cantidad de bolsas es requerida para pedidos de maquila');
        if (dto.cantidad <= 0) throw new Error('La cantidad de bolsas debe ser mayor a 0');
        if (dto.gramaje <= 0) throw new Error('El gramaje debe ser mayor a 0');

        // calcular el total en gramos y pasar a kilos
        const totalSolicitadoKg = (dto.cantidad * dto.gramaje);
        if (loteTostado.peso < totalSolicitadoKg) {
            throw new Error(`Stock insuficiente. Solo hay ${loteTostado.peso} kg disponibles`);
        }

        // 3. Validar cliente
        const cliente = await this.clienteRepository.getUserById(dto.id_user);
        if (!cliente || cliente.eliminado) {
            throw new Error("Cliente no válido");
        }

        // 4. Crear pedido de maquila
        const pedido = await this.pedidoRepository.createPedido(dto);

        return pedido;
    }

    async suscripcionValidations(dto: CreatePedidoDto): Promise<PedidoEntity> {

        // Validar cliente
        const cliente = await this.clienteRepository.getUserById(dto.id_user);
        if (!cliente || cliente.eliminado) {
            throw new Error("Cliente no válido");
        }
        const [error, usdto] = UpdateUserDto.update({
            suscripcion: true,
            cant_suscripcion: dto.cantidad
        });
        await this.clienteRepository.updateUser(dto.id_user, usdto!);

        // Crear pedido de suscripción
        const pedido = await this.pedidoRepository.createPedido(dto);

        // completar el pedido automáticamente
        await this.pedidoRepository.completarPedido(pedido.id_pedido);

        return pedido;

    }
}

