import { prisma } from "../../../data/postgres";
import { RegistrarDevolucionEnvioDto } from "../../dtos/envio/registrar-devolucion";
import { EnvioEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";
import { PaqueteItemRepository } from "../../repository/paquete-item.repository";
import { PaqueteRepository } from "../../repository/paquete.repository";
import { InventarioGenericoRepository } from "../../repository/inventario-generico.repository";
import { MovimientoAlmacenRepository } from "../../repository/movimiento-almacen.repository";
import { HistorialRepository } from "../../repository/historial.repository";
import { CreateMovimientoAlmacenDto } from "../../dtos/almacen/movimiento-almacen/create";
import { CreateHistorialDto } from "../../dtos/historial/create";

// Misma atomicidad real vía prisma.$transaction que DespacharEnvio.

export interface RegistrarDevolucionEnvioUseCase {
    execute(id_envio: string, dto: RegistrarDevolucionEnvioDto): Promise<EnvioEntity>;
}

export class RegistrarDevolucionEnvio implements RegistrarDevolucionEnvioUseCase {
    constructor(
        private readonly envioRepo: EnvioRepository,
        private readonly paqueteItemRepo: PaqueteItemRepository,
        private readonly paqueteRepo: PaqueteRepository,
        private readonly inventarioRepo: InventarioGenericoRepository,
        private readonly movimientoRepo: MovimientoAlmacenRepository,
        private readonly historialRepo: HistorialRepository,
    ) { }

    async execute(id_envio: string, dto: RegistrarDevolucionEnvioDto): Promise<EnvioEntity> {
        // --- Fuera de la transacción: solo lecturas ---
        const envio = await this.envioRepo.getById(id_envio);
        if (!envio) throw new Error('Envío no encontrado');
        if (envio.estado !== 'DESPACHADO' && envio.estado !== 'EN_TRANSITO' && envio.estado !== 'ENTREGADO')
            throw new Error('Solo se puede registrar devolución de un envío que ya fue despachado');

        const items = await this.paqueteItemRepo.getByPaquete(envio.id_paquete);

        // --- Dentro de la transacción: todo lo que escribe ---
        return prisma.$transaction(async (tx) => {
            for (const item of items) {
                await this.inventarioRepo.reingresarStock({
                    entidad: item.entidad, id_entidad: item.id_entidad, id_almacen: item.id_almacen,
                    cantidad: item.cantidad, gramaje: item.gramaje, molienda: item.molienda,
                }, tx);

                const [errMov, movDto] = CreateMovimientoAlmacenDto.create({
                    tipo: 'INGRESO',
                    entidad: item.entidad,
                    id_entidad_primario: item.id_entidad,
                    id_almacen_destino: item.id_almacen,
                    cantidad: item.cantidad,
                    id_user: dto.registrado_por_id,
                });
                if (errMov || !movDto) throw new Error(errMov ?? 'Error al registrar el movimiento de almacén');
                await this.movimientoRepo.createMovimiento(movDto, tx);
            }

            const envioActualizado = await this.envioRepo.registrarDevolucion(id_envio, dto, tx);

            // El stock ya volvió al almacén — el paquete vuelve a LISTO para poder
            // reintentar el envío. Mismo criterio que ya aplica CancelarEnvio.
            await this.paqueteRepo.actualizarEstado(envio.id_paquete, 'LISTO', {}, tx);

            const [errHist, histDto] = CreateHistorialDto.create({
                entidad: 'ENVIO',
                id_entidad: id_envio,
                id_user: dto.registrado_por_id,
                accion: 'INGRESO',
                comentario: dto.comentario ?? 'Devolución registrada, inventario reingresado',
            });
            if (errHist || !histDto) throw new Error(errHist ?? 'Error al registrar el historial');
            await this.historialRepo.createHistorial(histDto, tx);

            return envioActualizado;
        });
    }
}