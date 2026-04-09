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
import { InventarioLoteRepository } from "../../repository/inventario-lote.repository";
import { InventarioLoteTostadoRepository } from "../../repository/inventario-lote-tostado.repository";


export interface CreatePedidoUseCase {
    execute(createPedidoDto: CreatePedidoDto, id_completado_por: string): Promise<PedidoEntity>;
}

export class CreatePedido implements CreatePedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly inventarioLoteRepository: InventarioLoteRepository,
        private readonly loteTostadoRepository: LoteTostadoRepository,
        private readonly inventarioLoteTostadoRepository: InventarioLoteTostadoRepository,
        private readonly clienteRepository: UserRepository,
        private readonly tuesteRepository: TuesteRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,

    ) { }

    async execute(dto: CreatePedidoDto, id_completado_por: string): Promise<PedidoEntity> {
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
                return this.suscripcionValidations(dto, id_completado_por);
                break;
            default:
                throw new Error('Tipo de pedido inválido');
        }

    }

    async ventaVerdeValidations(dto: CreatePedidoDto): Promise<PedidoEntity> {
        const lote = await this.loteRepository.getLoteById(dto.id_lote!);
        if (!lote || lote.eliminado) throw new Error("Lote no válido");

        // verificar que el lote tenga un inventario
        // verificar que el lote tenga suficiente peso para la cantidad solicitada en su almacen correspondiente
        const inventarioLote = await this.inventarioLoteRepository.getByLoteAndAlmacen(lote.id_lote, dto.id_almacen!);
        if (!inventarioLote || inventarioLote.cantidad_kg < dto.cantidad) {
            throw new Error("Stock insuficiente en el almacén");
        }


        const cliente = await this.clienteRepository.getUserById(dto.id_user);
        if (!cliente || cliente.eliminado) throw new Error("Cliente no válido");

        return this.pedidoRepository.createPedido(dto);

    }

    async tostadoVerdeValidations(dto: CreatePedidoDto): Promise<PedidoEntity> {
        const lote = await this.loteRepository.getLoteById(dto.id_lote!);
        if (!lote || lote.eliminado) throw new Error("Lote no válido");


        // verificar que el lote tenga suficiente peso para la cantidad solicitada en su almacen correspondiente
        const cantidadVerde = dto.cantidad * 1.1765;
        const inventarioLote = await this.inventarioLoteRepository.getByLoteAndAlmacen(lote.id_lote, dto.id_almacen!);
        if (!inventarioLote || inventarioLote.cantidad_kg < cantidadVerde) {
            throw new Error("Stock insuficiente en el almacén");
        }

        const cliente = await this.clienteRepository.getUserById(dto.id_user);
        if (!cliente || cliente.eliminado) throw new Error("Cliente no válido");

        return this.pedidoRepository.createPedido(dto);
    }

    async ordenTueste(dto: CreatePedidoDto): Promise<PedidoEntity> {
        // 1. Validar cliente
        const user = await this.clienteRepository.getUserById(dto.id_user);
        if (!user || user.eliminado) {
            throw new Error('El cliente no existe o está eliminado');
        }

        // 2. Validar lote
        if (!dto.id_lote) {
            throw new Error('El id_lote es requerido para una orden de tueste');
        }

        const lote = await this.loteRepository.getLoteById(dto.id_lote);
        if (!lote || lote.eliminado) {
            throw new Error('Lote no válido');
        }

        // 3. Validar almacén e inventario disponible
        if (!dto.id_almacen) {
            throw new Error('El id_almacen es requerido para una orden de tueste');
        }

        const inventarioLote = await this.inventarioLoteRepository.getByLoteAndAlmacen(
            lote.id_lote,
            dto.id_almacen
        );

        if (!inventarioLote) {
            throw new Error('No se encontró el inventario para el lote y almacén especificados');
        }

        const factor = 1.1765;

        // validar verde
        if (inventarioLote.cantidad_kg < dto.cantidad) {
            throw new Error('No hay suficiente café verde disponible');
        }

        // calcular tostado equivalente
        const cantidadTostado = dto.cantidad / factor;

        // validar tostado
        if (lote.tipo_lote === 'Lote Tostado') {

            if (inventarioLote.cantidad_tostado_kg == null ||inventarioLote.cantidad_tostado_kg < cantidadTostado) {
                throw new Error('No hay suficiente café tostado disponible');
            }
        }

        // validar tostado (solo si aplica)
        if (lote.tipo_lote === 'Lote Tostado') {
            const tostadoDisponible = inventarioLote.cantidad_tostado_kg ?? 0;

            if (tostadoDisponible < dto.cantidad) {
                throw new Error('No hay suficiente cantidad tostada en el lote');
            }
        }


        // 4. Obtener análisis físico si existe
        let analisisFisico: AnalisisFisicoEntity | null = null;

        if (!lote.id_analisis) {
            console.warn('El lote no tiene un análisis asociado, usando valores por defecto');
        } else {
            const analisis = await this.analisisRepository.getAnalisisById(lote.id_analisis);

            if (!analisis) {
                console.warn(`No se encontró el análisis ${lote.id_analisis}, usando valores por defecto`);
            } else {
                analisisFisico = await this.analisisFisicoRepository.getAnalisisFisicoById(
                    analisis.analisisFisico_id!
                );

                if (!analisisFisico) {
                    console.warn(
                        `No se encontró el análisis físico ${analisis.analisisFisico_id}, usando valores por defecto`
                    );
                }
            }
        }

        // 5. Crear pedido
        const pedido = await this.pedidoRepository.createPedido(dto);

        // 6. Generar tuestes
        if (!dto.pesos || dto.pesos.length === 0) {
            throw new Error('Los pesos son requeridos');
        }

        const density = analisisFisico?.densidad ?? 0;
        const humidity = analisisFisico?.humedad ?? 0;

        let cant = 1;
        for (const peso of dto.pesos) {
            const [error, createTuesteDto] = CreateTuesteDto.create({
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

            if (error || !createTuesteDto) {
                throw new Error(error ?? 'Error al crear DTO de tueste');
            }

            await this.tuesteRepository.createTueste(createTuesteDto);
            cant++;
        }

        return PedidoEntity.fromObject(pedido);
    }

    async maquilaValidations(dto: CreatePedidoDto): Promise<PedidoEntity> {

        // 1. Validar cliente
        const cliente = await this.clienteRepository.getUserById(dto.id_user);
        if (!cliente || cliente.eliminado) {
            throw new Error("Cliente no válido");
        }

        // 2. Verificar que el lote tostado exista
        const loteTostado = await this.loteTostadoRepository.getLoteTostadoById(dto.id_lote_tostado!);
        if (!loteTostado || loteTostado.peso < 0) {
            throw new Error("Lote tostado no válido o eliminado");
        }

        // 3. Validar campos requeridos
        if (!dto.gramaje) throw new Error('El gramaje es requerido para pedidos de maquila');
        if (!dto.cantidad) throw new Error('La cantidad de bolsas es requerida para pedidos de maquila');
        if (dto.cantidad <= 0) throw new Error('La cantidad de bolsas debe ser mayor a 0');
        if (dto.gramaje <= 0) throw new Error('El gramaje debe ser mayor a 0');

        //4. calcular el total en gramos y verificar que el lote tostado tenga suficiente peso para la cantidad solicitada
        const totalSolicitadoKg = (dto.cantidad * dto.gramaje);
        const inventarioLoteTostado = await this.inventarioLoteTostadoRepository.getByLoteTostadoAndAlmacen(loteTostado.id_lote_tostado, dto.id_almacen!);
        if (!inventarioLoteTostado) {
            throw new Error('No se encontró el inventario para el lote tostado y almacén especificados');
        }
        if (inventarioLoteTostado.cantidad_kg < totalSolicitadoKg) {
            throw new Error(`Stock insuficiente. Solo hay ${inventarioLoteTostado.cantidad_kg} kg disponibles`);
        }

        // 4. Crear pedido de maquila
        const pedido = await this.pedidoRepository.createPedido(dto);

        return pedido;
    }

    async suscripcionValidations(dto: CreatePedidoDto, id_completado_por: string): Promise<PedidoEntity> {

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
        await this.pedidoRepository.completarPedido(pedido.id_pedido, id_completado_por);

        return pedido;

    }

}



