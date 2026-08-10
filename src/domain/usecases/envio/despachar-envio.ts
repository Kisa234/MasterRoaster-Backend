import { prisma } from "../../../data/postgres";
import { DespacharEnvioDto } from "../../dtos/envio/despachar";
import { EnvioEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";
import { PaqueteRepository } from "../../repository/paquete.repository";
import { PaqueteItemRepository } from "../../repository/paquete-item.repository";
import { InventarioGenericoRepository } from "../../repository/inventario-generico.repository";
import { MovimientoAlmacenRepository } from "../../repository/movimiento-almacen.repository";
import { HistorialRepository } from "../../repository/historial.repository";
import { CreateMovimientoAlmacenDto } from "../../dtos/almacen/movimiento-almacen/create";
import { CreateHistorialDto } from "../../dtos/historial/create";

// Atomicidad real vía prisma.$transaction: si algo falla a mitad del bucle,
// TODOS los descuentos/movimientos/actualizaciones ya hechos en esta llamada
// se revierten solos — no puede quedar un despacho parcial.

export interface DespacharEnvioUseCase {
    execute(id_envio: string, dto: DespacharEnvioDto): Promise<EnvioEntity>;
}

export class DespacharEnvio implements DespacharEnvioUseCase {
    constructor(
        private readonly envioRepo: EnvioRepository,
        private readonly paqueteRepo: PaqueteRepository,
        private readonly paqueteItemRepo: PaqueteItemRepository,
        private readonly inventarioRepo: InventarioGenericoRepository,
        private readonly movimientoRepo: MovimientoAlmacenRepository,
        private readonly historialRepo: HistorialRepository,
    ) { }

    async execute(id_envio: string, dto: DespacharEnvioDto): Promise<EnvioEntity> {
        // --- Fuera de la transacción: solo lecturas, no mutan nada ---
        const envio = await this.envioRepo.getById(id_envio);
        if (!envio) throw new Error('Envío no encontrado');
        if (envio.estado !== 'PENDIENTE' && envio.estado !== 'PROGRAMADO')
            throw new Error('El envío no está en un estado válido para despachar');

        const items = await this.paqueteItemRepo.getByPaquete(envio.id_paquete);
        if (items.length === 0) throw new Error('El paquete no tiene artículos para despachar');

        // Validar TODO el stock antes de tocar nada (esto ya evitaba la mayoría
        // de los fallos; la transacción cubre lo que la validación no puede:
        // race conditions y fallos de infraestructura a mitad de camino).
        for (const item of items) {
            const disponible = await this.inventarioRepo.obtenerStockDisponible({
                entidad: item.entidad, id_entidad: item.id_entidad, id_almacen: item.id_almacen,
                cantidad: item.cantidad, gramaje: item.gramaje, molienda: item.molienda,
            });
            if (disponible < item.cantidad) {
                throw new Error(`Stock insuficiente para ${item.entidad} ${item.id_entidad}: disponible ${disponible}, requerido ${item.cantidad}`);
            }
        }

        // --- Dentro de la transacción: todo lo que escribe ---
        return prisma.$transaction(async (tx) => {
            for (const item of items) {
                await this.inventarioRepo.descontarStock({
                    entidad: item.entidad, id_entidad: item.id_entidad, id_almacen: item.id_almacen,
                    cantidad: item.cantidad, gramaje: item.gramaje, molienda: item.molienda,
                }, tx);

                const [errMov, movDto] = CreateMovimientoAlmacenDto.create({
                    tipo: 'SALIDA',
                    entidad: item.entidad,
                    id_entidad_primario: item.id_entidad,
                    id_almacen_origen: item.id_almacen,
                    cantidad: item.cantidad,
                    id_user: dto.despachado_por_id,
                });
                if (errMov || !movDto) throw new Error(errMov ?? 'Error al registrar el movimiento de almacén');
                await this.movimientoRepo.createMovimiento(movDto, tx);
            }

            await this.paqueteRepo.actualizarEstado(envio.id_paquete, 'DESPACHADO', {}, tx);
            const envioActualizado = await this.envioRepo.despachar(id_envio, dto, tx);

            const [errHist, histDto] = CreateHistorialDto.create({
                entidad: 'ENVIO',
                id_entidad: id_envio,
                id_user: dto.despachado_por_id,
                accion: 'SALIDA',
                comentario: 'Envío despachado, inventario descontado',
            });
            if (errHist || !histDto) throw new Error(errHist ?? 'Error al registrar el historial');
            await this.historialRepo.createHistorial(histDto, tx);

            return envioActualizado;
        });
    }
}